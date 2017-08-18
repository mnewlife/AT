/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, NewAirtimeStockMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoNewAirtimeStock extends MongoController implements storageInterfaces.powertel.NewAirtimeStock {

  /*****************************************************************/

  protected readonly events: storageInterfaces.powertel.newAirtimeStock.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.powertel.newAirtimeStock.Events;
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

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => {

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
      .then(( foundNewAirtimeStocks: Model[] ) => {

        return this.convertToAbstract( foundNewAirtimeStocks );

      } )
      .then(( convertedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<dataModel.powertel.newAirtimeStock.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedNewAirtimeStocks.map(( newAirtimeStock ) => {
              return newAirtimeStock.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewAirtimeStocks );

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

  readonly getById = ( newAirtimeStockId: string, forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newAirtimeStockId ) );

      } )
      .then(( foundNewAirtimeStock: Model ) => {

        return this.convertToAbstract( [ foundNewAirtimeStock ] );

      } )
      .then(( convertedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: newAirtimeStockId
          } );
        } );

        return Promise.resolve( convertedNewAirtimeStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: newAirtimeStockId,
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

  readonly addBatch = ( newAirtimeStocks: storageInterfaces.powertel.newAirtimeStock.AddDetails[], forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( newAirtimeStocks.map(( newAirtimeStock ) => {
          let newAirtimeStockDetails: Model_Partial = {
            initialBalance: newAirtimeStock.initialBalance,
            newBalance: newAirtimeStock.newBalance,
            amount: newAirtimeStock.amount
          };
          return newAirtimeStockDetails;
        } ) );

      } )
      .then(( addedNewAirtimeStocks: Model[] ) => {

        return this.convertToAbstract( addedNewAirtimeStocks );

      } )
      .then(( convertedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedNewAirtimeStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewAirtimeStocks );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: newAirtimeStocks,
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

  readonly add = ( details: storageInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let newAirtimeStockDetails: Model_Partial = {
          initialBalance: details.initialBalance,
          newBalance: details.newBalance,
          amount: details.amount
        };

        return this.saveDocument( newAirtimeStockDetails );

      } )
      .then(( addedNewAirtimeStock: Model ) => {

        return this.convertToAbstract( [ addedNewAirtimeStock ] );

      } )
      .then(( convertedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedNewAirtimeStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewAirtimeStocks[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, details: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundNewAirtimeStocks: Model[] ) => {

        return Promise.all( foundNewAirtimeStocks.map(( newAirtimeStock ) => {

          return this.generateUpdateDetails( newAirtimeStock, details )
            .then(( fedNewAirtimeStock: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedNewAirtimeStock.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedNewAirtimeStock );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedNewAirtimeStocks: Model[] ) => {

        return this.convertToAbstract( updatedNewAirtimeStocks );

      } )
      .then(( updatedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedNewAirtimeStocks
          } );
          resolve();
        } );

        return Promise.resolve( updatedNewAirtimeStocks );

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

  readonly updateById = ( newAirtimeStockId: string, details: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super> => {

    let newAirtimeStockObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newAirtimeStockId ) );

      } )
      .then(( newAirtimeStock: Model ) => {

        return this.generateUpdateDetails( newAirtimeStock, details )
          .then(( fedNewAirtimeStock: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedNewAirtimeStock.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedNewAirtimeStock );
                }
              } );
            } );

          } );

      } )
      .then(( updatedNewAirtimeStock: Model ) => {

        return this.convertToAbstract( [ updatedNewAirtimeStock ] );

      } )
      .then(( convertedNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: newAirtimeStockId,
            documents: convertedNewAirtimeStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewAirtimeStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: newAirtimeStockId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( newAirtimeStockId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: newAirtimeStockId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: newAirtimeStockId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.initialBalance ) {
        conditions[ "initialBalance" ] = {};
        if ( filtrationCriteria.initialBalance.min ) {
          conditions[ "initialBalance" ].$gte = filtrationCriteria.initialBalance.min;
        }
        if ( filtrationCriteria.initialBalance.max ) {
          conditions[ "initialBalance" ].$lte = filtrationCriteria.initialBalance.max;
        }
      }

      if ( filtrationCriteria.newBalance ) {
        conditions[ "newBalance" ] = {};
        if ( filtrationCriteria.newBalance.min ) {
          conditions[ "newBalance" ].$gte = filtrationCriteria.newBalance.min;
        }
        if ( filtrationCriteria.newBalance.max ) {
          conditions[ "newBalance" ].$lte = filtrationCriteria.newBalance.max;
        }
      }

      if ( filtrationCriteria.amount ) {
        conditions[ "amount" ] = {};
        if ( filtrationCriteria.amount.min ) {
          conditions[ "amount" ].$gte = filtrationCriteria.amount.min;
        }
        if ( filtrationCriteria.amount.max ) {
          conditions[ "amount" ].$lte = filtrationCriteria.amount.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.newAirtimeStock.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.initialBalance ) {
        document.initialBalance = details.initialBalance;
      }

      if ( details.newBalance ) {
        document.newBalance = details.newBalance;
      }

      if ( details.amount ) {
        document.amount = details.amount;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( newAirtimeStocks: Model[], forceThrow = false ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.powertel.newAirtimeStock.Super[]>(( resolve, reject ) => {

          let returnNewAirtimeStocks: dataModel.powertel.newAirtimeStock.Super[] = [];

          newAirtimeStocks.forEach(( newAirtimeStock ) => {

            let returnNewAirtimeStock: dataModel.powertel.newAirtimeStock.Super = {
              id: ( <mongoose.Types.ObjectId>newAirtimeStock._id ).toHexString(),
              initialBalance: newAirtimeStock.initialBalance,
              newBalance: newAirtimeStock.newBalance,
              amount: newAirtimeStock.amount,
              createdAt: newAirtimeStock.createdAt,
              updatedAt: newAirtimeStock.updatedAt
            };

            returnNewAirtimeStocks.push( returnNewAirtimeStock );

          } );

          resolve( returnNewAirtimeStocks );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "initialBalance"?: { $gte?: number; $lte?: number; };
  "newBalance"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.NewAirtimeStock => {
  return new MongoNewAirtimeStock( {
    events: eventsFactory( params.emitEvent ),
    Model: NewAirtimeStockMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
