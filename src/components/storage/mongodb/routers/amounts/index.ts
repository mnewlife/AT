/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AmountsMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoAmounts extends MongoController implements storageInterfaces.routers.Amounts {

  /*****************************************************************/

  protected readonly events: storageInterfaces.routers.amounts.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.routers.amounts.Events;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      events: params.events,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.events = params.events;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.routers.amounts.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundAmountss: Model[] ) => {

        return this.convertToAbstract( foundAmountss );

      } )
      .then(( convertedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<dataModel.routers.amounts.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAmountss.map(( amounts ) => {
              return amounts.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAmountss );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( amountsId: string, forceThrow = false ): Promise<dataModel.routers.amounts.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( amountsId ) );

      } )
      .then(( foundAmounts: Model ) => {

        return this.convertToAbstract( [ foundAmounts ] );

      } )
      .then(( convertedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: amountsId
          } );
        } );

        return Promise.resolve( convertedAmountss[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: amountsId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier: "DocumentNotFound",
            data: {
              reason: reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier: "GetByIdFailed",
            data: {
              reason: reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( amountss: storageInterfaces.routers.amounts.AddDetails[], forceThrow = false ): Promise<dataModel.routers.amounts.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( amountss.map(( amounts ) => {
          let amountsDetails: Model_Partial = {
            type: amounts.type,
            count: amounts.count,
            newStock: amounts.newStock,
            sold: amounts.sold
          };
          return amountsDetails;
        } ) );

      } )
      .then(( addedAmountss: Model[] ) => {

        return this.convertToAbstract( addedAmountss );

      } )
      .then(( convertedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAmountss
          } );
          resolve();
        } );

        return Promise.resolve( convertedAmountss );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: amountss,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddBatchFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( details: storageInterfaces.routers.amounts.AddDetails, forceThrow = false ): Promise<dataModel.routers.amounts.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let amountsDetails: Model_Partial = {
          type: details.type,
          count: details.count,
          newStock: details.newStock,
          sold: details.sold
        };

        return this.saveDocument( amountsDetails );

      } )
      .then(( addedAmounts: Model ) => {

        return this.convertToAbstract( [ addedAmounts ] );

      } )
      .then(( convertedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAmountss
          } );
          resolve();
        } );

        return Promise.resolve( convertedAmountss[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, details: storageInterfaces.routers.amounts.UpdateDetails, forceThrow = false ): Promise<dataModel.routers.amounts.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAmountss: Model[] ) => {

        return Promise.all( foundAmountss.map(( amounts ) => {

          return this.generateUpdateDetails( amounts, details )
            .then(( fedAmounts: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAmounts.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAmounts );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAmountss: Model[] ) => {

        return this.convertToAbstract( updatedAmountss );

      } )
      .then(( updatedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedAmountss
          } );
          resolve();
        } );

        return Promise.resolve( updatedAmountss );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( amountsId: string, details: storageInterfaces.routers.amounts.UpdateDetails, forceThrow = false ): Promise<dataModel.routers.amounts.Super> => {

    let amountsObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( amountsId ) );

      } )
      .then(( amounts: Model ) => {

        return this.generateUpdateDetails( amounts, details )
          .then(( fedAmounts: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAmounts.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAmounts );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAmounts: Model ) => {

        return this.convertToAbstract( [ updatedAmounts ] );

      } )
      .then(( convertedAmountss: dataModel.routers.amounts.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: amountsId,
            documents: convertedAmountss
          } );
          resolve();
        } );

        return Promise.resolve( convertedAmountss[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: amountsId,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            conditions: filtrationCriteria,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeById = ( amountsId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( amountsId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: amountsId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: amountsId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.type ) {
        conditions[ "type" ] = filtrationCriteria.type;
      }

      if ( filtrationCriteria.count ) {
        conditions[ "count" ] = {};
        if ( filtrationCriteria.count.min ) {
          conditions[ "count" ].$gte = filtrationCriteria.count.min;
        }
        if ( filtrationCriteria.count.max ) {
          conditions[ "count" ].$lte = filtrationCriteria.count.max;
        }
      }

      if ( filtrationCriteria.newStock ) {
        conditions[ "newStock" ] = {};
        if ( filtrationCriteria.newStock.min ) {
          conditions[ "newStock" ].$gte = filtrationCriteria.newStock.min;
        }
        if ( filtrationCriteria.newStock.max ) {
          conditions[ "newStock" ].$lte = filtrationCriteria.newStock.max;
        }
      }

      if ( filtrationCriteria.sold ) {
        conditions[ "sold" ] = {};
        if ( filtrationCriteria.sold.min ) {
          conditions[ "sold" ].$gte = filtrationCriteria.sold.min;
        }
        if ( filtrationCriteria.sold.max ) {
          conditions[ "sold" ].$lte = filtrationCriteria.sold.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.routers.amounts.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      sortString = sortCriteria.criteria;
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.routers.amounts.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.type ) {
        document.type = details.type;
      }

      if ( details.countPlus ) {
        document.count += details.countPlus;
      }
      if ( details.countMinus ) {
        document.count -= details.countMinus;
      }
      if ( details.count ) {
        document.count = details.count;
      }

      if ( details.newStockPlus ) {
        document.newStock += details.newStockPlus;
      }
      if ( details.newStockMinus ) {
        document.newStock -= details.newStockMinus;
      }
      if ( details.newStock ) {
        document.newStock = details.newStock;
      }

      if ( details.soldPlus ) {
        document.sold += details.soldPlus;
      }
      if ( details.soldMinus ) {
        document.sold -= details.soldMinus;
      }
      if ( details.sold ) {
        document.sold = details.sold;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( amountss: Model[], forceThrow = false ): Promise<dataModel.routers.amounts.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.routers.amounts.Super[]>(( resolve, reject ) => {

          let returnAmountss: dataModel.routers.amounts.Super[] = [];

          amountss.forEach(( amounts ) => {

            let returnAmounts: dataModel.routers.amounts.Super = {
              id: ( <mongoose.Types.ObjectId>amounts._id ).toHexString(),
              type: amounts.type,
              count: amounts.count,
              newStock: amounts.newStock,
              sold: amounts.sold,
              createdAt: amounts.createdAt,
              updatedAt: amounts.updatedAt
            };

            returnAmountss.push( returnAmounts );

          } );

          resolve( returnAmountss );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "type"?: string;
  "count"?: { $gte?: number; $lte?: number; };
  "newStock"?: { $gte?: number; $lte?: number; };
  "sold"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.routers.Amounts => {
  return new MongoAmounts( {
    events: eventsFactory( params.emitEvent ),
    Model: AmountsMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
