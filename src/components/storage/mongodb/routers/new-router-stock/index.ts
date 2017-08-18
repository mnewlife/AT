/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, NewRouterStockMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoNewRouterStock extends MongoController implements storageInterfaces.routers.NewRouterStock {

  /*****************************************************************/

  protected readonly events: storageInterfaces.routers.newRouterStock.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.routers.newRouterStock.Events;
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

  readonly get = ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super[]> => {

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
      .then(( foundNewRouterStocks: Model[] ) => {

        return this.convertToAbstract( foundNewRouterStocks );

      } )
      .then(( convertedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<dataModel.routers.newRouterStock.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedNewRouterStocks.map(( newRouterStock ) => {
              return newRouterStock.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewRouterStocks );

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

  readonly getById = ( newRouterStockId: string, forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newRouterStockId ) );

      } )
      .then(( foundNewRouterStock: Model ) => {

        return this.convertToAbstract( [ foundNewRouterStock ] );

      } )
      .then(( convertedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: newRouterStockId
          } );
        } );

        return Promise.resolve( convertedNewRouterStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: newRouterStockId,
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

  readonly addBatch = ( newRouterStocks: storageInterfaces.routers.newRouterStock.AddDetails[], forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( newRouterStocks.map(( newRouterStock ) => {
          let newRouterStockDetails: Model_Partial = {
            type: newRouterStock.type,
            initialCount: newRouterStock.initialCount,
            newCount: newRouterStock.newCount,
            amount: newRouterStock.amount
          };
          return newRouterStockDetails;
        } ) );

      } )
      .then(( addedNewRouterStocks: Model[] ) => {

        return this.convertToAbstract( addedNewRouterStocks );

      } )
      .then(( convertedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedNewRouterStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewRouterStocks );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: newRouterStocks,
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

  readonly add = ( details: storageInterfaces.routers.newRouterStock.AddDetails, forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let newRouterStockDetails: Model_Partial = {
          type: details.type,
          initialCount: details.initialCount,
          newCount: details.newCount,
          amount: details.amount
        };

        return this.saveDocument( newRouterStockDetails );

      } )
      .then(( addedNewRouterStock: Model ) => {

        return this.convertToAbstract( [ addedNewRouterStock ] );

      } )
      .then(( convertedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedNewRouterStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewRouterStocks[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, details: storageInterfaces.routers.newRouterStock.UpdateDetails, forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundNewRouterStocks: Model[] ) => {

        return Promise.all( foundNewRouterStocks.map(( newRouterStock ) => {

          return this.generateUpdateDetails( newRouterStock, details )
            .then(( fedNewRouterStock: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedNewRouterStock.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedNewRouterStock );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedNewRouterStocks: Model[] ) => {

        return this.convertToAbstract( updatedNewRouterStocks );

      } )
      .then(( updatedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedNewRouterStocks
          } );
          resolve();
        } );

        return Promise.resolve( updatedNewRouterStocks );

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

  readonly updateById = ( newRouterStockId: string, details: storageInterfaces.routers.newRouterStock.UpdateDetails, forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super> => {

    let newRouterStockObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( newRouterStockId ) );

      } )
      .then(( newRouterStock: Model ) => {

        return this.generateUpdateDetails( newRouterStock, details )
          .then(( fedNewRouterStock: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedNewRouterStock.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedNewRouterStock );
                }
              } );
            } );

          } );

      } )
      .then(( updatedNewRouterStock: Model ) => {

        return this.convertToAbstract( [ updatedNewRouterStock ] );

      } )
      .then(( convertedNewRouterStocks: dataModel.routers.newRouterStock.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: newRouterStockId,
            documents: convertedNewRouterStocks
          } );
          resolve();
        } );

        return Promise.resolve( convertedNewRouterStocks[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: newRouterStockId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( newRouterStockId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( newRouterStockId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: newRouterStockId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: newRouterStockId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.type ) {
        conditions[ "type" ] = filtrationCriteria.type;
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

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.routers.newRouterStock.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.routers.newRouterStock.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.type ) {
        document.type = details.type;
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

  private readonly convertToAbstract = ( newRouterStocks: Model[], forceThrow = false ): Promise<dataModel.routers.newRouterStock.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.routers.newRouterStock.Super[]>(( resolve, reject ) => {

          let returnNewRouterStocks: dataModel.routers.newRouterStock.Super[] = [];

          newRouterStocks.forEach(( newRouterStock ) => {

            let returnNewRouterStock: dataModel.routers.newRouterStock.Super = {
              id: ( <mongoose.Types.ObjectId>newRouterStock._id ).toHexString(),
              type: newRouterStock.type,
              initialCount: newRouterStock.initialCount,
              newCount: newRouterStock.newCount,
              amount: newRouterStock.amount,
              createdAt: newRouterStock.createdAt,
              updatedAt: newRouterStock.updatedAt
            };

            returnNewRouterStocks.push( returnNewRouterStock );

          } );

          resolve( returnNewRouterStocks );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "type"?: string;
  "initialCount"?: { $gte?: number; $lte?: number; };
  "newCount"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.routers.NewRouterStock => {
  return new MongoNewRouterStock( {
    events: eventsFactory( params.emitEvent ),
    Model: NewRouterStockMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
