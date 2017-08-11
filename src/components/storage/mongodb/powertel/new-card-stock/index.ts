/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, NewCardStockMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoNewCardStock extends MongoController implements storageInterfaces.powertel.NewCardStock {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.powertel.newCardStock.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.powertel.newCardStock.Emitter;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      emitter: params.emitter,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => {

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
      .then(( foundNewCardStocks: Model[] ) => {

        return this.convertToAbstract( foundNewCardStocks );

      } )
      .then(( convertedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<interfaces.dataModel.powertel.newCardStock.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedNewCardStocks.map(( newCardStock ) => {
              return newCardStock.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewCardStocks );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getFailed( {
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

  readonly getById = ( newCardStockId: string, forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newCardStockId ) );

      } )
      .then(( foundNewCardStock: Model ) => {

        return this.convertToAbstract( [ foundNewCardStock ] );

      } )
      .then(( convertedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: newCardStockId
          } );
        } );

        return Promise.resolve( convertedNewCardStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: newCardStockId,
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

  readonly addBatch = ( newCardStocks: storageInterfaces.powertel.newCardStock.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( newCardStocks.map(( newCardStock ) => {
          let newCardStockDetails: Model_Partial = {
            initialCount: newCardStock.initialCount,
            newCount: newCardStock.newCount,
            amount: newCardStock.amount
          };
          if ( newCardStock.mdnRange ) {
            newCardStockDetails.mdnRange = {};
            if ( newCardStock.mdnRange.min ) {
              newCardStockDetails.mdnRange.min = newCardStock.mdnRange.min;
            }
            if ( newCardStock.mdnRange.max ) {
              newCardStockDetails.mdnRange.max = newCardStock.mdnRange.max;
            }
          }
          return newCardStockDetails;
        } ) );

      } )
      .then(( addedNewCardStocks: Model[] ) => {

        return this.convertToAbstract( addedNewCardStocks );

      } )
      .then(( convertedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedNewCardStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewCardStocks );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: newCardStocks,
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

  readonly add = ( details: storageInterfaces.powertel.newCardStock.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let newCardStockDetails: Model_Partial = {
          initialCount: details.initialCount,
          newCount: details.newCount,
          amount: details.amount
        };
        if ( details.mdnRange ) {
          newCardStockDetails.mdnRange = {};
          if ( details.mdnRange.min ) {
            newCardStockDetails.mdnRange.min = details.mdnRange.min;
          }
          if ( details.mdnRange.max ) {
            newCardStockDetails.mdnRange.max = details.mdnRange.max;
          }
        }

        return this.saveDocument( newCardStockDetails );

      } )
      .then(( addedNewCardStock: Model ) => {

        return this.convertToAbstract( [ addedNewCardStock ] );

      } )
      .then(( convertedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedNewCardStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewCardStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.addFailed( {
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

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, details: storageInterfaces.powertel.newCardStock.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundNewCardStocks: Model[] ) => {

        return Promise.all( foundNewCardStocks.map(( newCardStock ) => {

          return this.generateUpdateDetails( newCardStock, details )
            .then(( fedNewCardStock: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedNewCardStock.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedNewCardStock );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedNewCardStocks: Model[] ) => {

        return this.convertToAbstract( updatedNewCardStocks );

      } )
      .then(( updatedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedNewCardStocks
          } );
          resolve();
        } );

        return Promise.resolve( updatedNewCardStocks );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
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

  readonly updateById = ( newCardStockId: string, details: storageInterfaces.powertel.newCardStock.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super> => {

    let newCardStockObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newCardStockId ) );

      } )
      .then(( newCardStock: Model ) => {

        return this.generateUpdateDetails( newCardStock, details )
          .then(( fedNewCardStock: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedNewCardStock.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedNewCardStock );
                }
              } );
            } );

          } );

      } )
      .then(( updatedNewCardStock: Model ) => {

        return this.convertToAbstract( [ updatedNewCardStock ] );

      } )
      .then(( convertedNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: newCardStockId,
            documents: convertedNewCardStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewCardStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: newCardStockId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
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

  readonly removeById = ( newCardStockId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( newCardStockId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: newCardStockId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: newCardStockId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.mdnRange ) {
        if ( filtrationCriteria.mdnRange.min ) {
          conditions[ "mdnRange.min" ] = {};
          if ( filtrationCriteria.mdnRange.min.min ) {
            conditions[ "mdnRange.min" ].$gte = filtrationCriteria.mdnRange.min.min;
          }
          if ( filtrationCriteria.mdnRange.min.max ) {
            conditions[ "mdnRange.min" ].$lte = filtrationCriteria.mdnRange.min.max;
          }
        }
        if ( filtrationCriteria.mdnRange.min ) {
          conditions[ "mdnRange.min" ] = {};
          if ( filtrationCriteria.mdnRange.max.min ) {
            conditions[ "mdnRange.max" ].$gte = filtrationCriteria.mdnRange.max.min;
          }
          if ( filtrationCriteria.mdnRange.max.max ) {
            conditions[ "mdnRange.max" ].$lte = filtrationCriteria.mdnRange.max.max;
          }
        }
      }

      if ( filtrationCriteria.initialCount ) {
        conditions[ "initialCount" ] = {};
        if ( filtrationCriteria.initialCount.min ) {
          conditions[ "initialCount" ].$gte = filtrationCriteria.initialCount.min;
        }
        if ( filtrationCriteria.initialCount.max ) {
          conditions[ "initialCount" ].$lte = filtrationCriteria.initialCount.max;
        }
      }

      if ( filtrationCriteria.newCount ) {
        conditions[ "newCount" ] = {};
        if ( filtrationCriteria.newCount.min ) {
          conditions[ "newCount" ].$gte = filtrationCriteria.newCount.min;
        }
        if ( filtrationCriteria.newCount.max ) {
          conditions[ "newCount" ].$lte = filtrationCriteria.newCount.max;
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

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.newCardStock.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.newCardStock.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.mdnRange ) {
        if ( details.mdnRange.min ) {
          document.mdnRange.min = details.mdnRange.min;
        }
        if ( details.mdnRange.max ) {
          document.mdnRange.max = details.mdnRange.max;
        }
      }

      if ( details.initialCount ) {
        document.initialCount = details.initialCount;
      }

      if ( details.newCount ) {
        document.newCount = details.newCount;
      }

      if ( details.amount ) {
        document.amount = details.amount;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( newCardStocks: Model[], forceThrow = false ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.powertel.newCardStock.Super[]>(( resolve, reject ) => {

          let returnNewCardStocks: interfaces.dataModel.powertel.newCardStock.Super[] = [];

          newCardStocks.forEach(( newCardStock ) => {

            let returnNewCardStock: interfaces.dataModel.powertel.newCardStock.Super = {
              id: ( <mongoose.Types.ObjectId>newCardStock._id ).toHexString(),
              initialCount: newCardStock.initialCount,
              newCount: newCardStock.newCount,
              amount: newCardStock.amount,
              createdAt: newCardStock.createdAt,
              updatedAt: newCardStock.updatedAt
            };

            if ( newCardStock.mdnRange ) {
              returnNewCardStock.mdnRange = {
                min: newCardStock.mdnRange.min,
                max: newCardStock.mdnRange.max
              }
            }

            returnNewCardStocks.push( returnNewCardStock );

          } );

          resolve( returnNewCardStocks );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "mdnRange.min"?: { $gte?: number; $lte?: number; };
  "mdnRange.max"?: { $gte?: number; $lte?: number; };

  "initialCount"?: { $gte?: number; $lte?: number; };
  "newCount"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.NewCardStock => {
  return new MongoNewCardStock( {
    emitter: emitterFactory( params.emitEvent ),
    Model: NewCardStockMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
