/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimeMongooseModel } from "./model";

import * as src from "../../../../../src";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class MongoAirtime extends MongoController implements storageInterfaces.powertel.Airtime {

  /*****************************************************************/

  protected readonly events: storageInterfaces.powertel.airtime.Events;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    events: storageInterfaces.powertel.airtime.Events;
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

  readonly get = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow = false ): Promise<dataModel.powertel.airtime.Super[]> => {

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
      .then(( foundAirtimes: Model[] ) => {

        return this.convertToAbstract( foundAirtimes );

      } )
      .then(( convertedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<dataModel.powertel.airtime.Super[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimes.map(( airtime ) => {
              return airtime.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimes );

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

  readonly getById = ( airtimeId: string, forceThrow = false ): Promise<dataModel.powertel.airtime.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeId ) );

      } )
      .then(( foundAirtime: Model ) => {

        return this.convertToAbstract( [ foundAirtime ] );

      } )
      .then(( convertedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: airtimeId
          } );
        } );

        return Promise.resolve( convertedAirtimes[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: airtimeId,
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

  readonly addBatch = ( airtimes: storageInterfaces.powertel.airtime.AddDetails[], forceThrow = false ): Promise<dataModel.powertel.airtime.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimes.map(( airtime ) => {
          let airtimeDetails: Model_Partial = {
            checkpoint: airtime.checkpoint,
            newStockValue: airtime.newStockValue,
            amountSold: airtime.amountSold,
            balance: airtime.balance
          };
          return airtimeDetails;
        } ) );

      } )
      .then(( addedAirtimes: Model[] ) => {

        return this.convertToAbstract( addedAirtimes );

      } )
      .then(( convertedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimes
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimes );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: airtimes,
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

  readonly add = ( details: storageInterfaces.powertel.airtime.AddDetails, forceThrow = false ): Promise<dataModel.powertel.airtime.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimeDetails: Model_Partial = {
          checkpoint: details.checkpoint,
          newStockValue: details.newStockValue,
          amountSold: details.amountSold,
          balance: details.balance
        };

        return this.saveDocument( airtimeDetails );

      } )
      .then(( addedAirtime: Model ) => {

        return this.convertToAbstract( [ addedAirtime ] );

      } )
      .then(( convertedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedAirtimes
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimes[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, details: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.airtime.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimes: Model[] ) => {

        return Promise.all( foundAirtimes.map(( airtime ) => {

          return this.generateUpdateDetails( airtime, details )
            .then(( fedAirtime: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtime.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtime );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimes: Model[] ) => {

        return this.convertToAbstract( updatedAirtimes );

      } )
      .then(( updatedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimes
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimes );

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

  readonly updateById = ( airtimeId: string, details: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow = false ): Promise<dataModel.powertel.airtime.Super> => {

    let airtimeObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeId ) );

      } )
      .then(( airtime: Model ) => {

        return this.generateUpdateDetails( airtime, details )
          .then(( fedAirtime: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtime.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtime );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtime: Model ) => {

        return this.convertToAbstract( [ updatedAirtime ] );

      } )
      .then(( convertedAirtimes: dataModel.powertel.airtime.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: airtimeId,
            documents: convertedAirtimes
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimes[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: airtimeId,
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

  readonly remove = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( airtimeId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimeId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: airtimeId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: airtimeId,
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

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.checkpoint ) {
        conditions[ "checkpoint" ] = {};
        if ( filtrationCriteria.checkpoint.min ) {
          conditions[ "checkpoint" ].$gte = filtrationCriteria.checkpoint.min;
        }
        if ( filtrationCriteria.checkpoint.max ) {
          conditions[ "checkpoint" ].$lte = filtrationCriteria.checkpoint.max;
        }
      }

      if ( filtrationCriteria.newStockValue ) {
        conditions[ "newStockValue" ] = {};
        if ( filtrationCriteria.newStockValue.min ) {
          conditions[ "newStockValue" ].$gte = filtrationCriteria.newStockValue.min;
        }
        if ( filtrationCriteria.newStockValue.max ) {
          conditions[ "newStockValue" ].$lte = filtrationCriteria.newStockValue.max;
        }
      }

      if ( filtrationCriteria.amountSold ) {
        conditions[ "amountSold" ] = {};
        if ( filtrationCriteria.amountSold.min ) {
          conditions[ "amountSold" ].$gte = filtrationCriteria.amountSold.min;
        }
        if ( filtrationCriteria.amountSold.max ) {
          conditions[ "amountSold" ].$lte = filtrationCriteria.amountSold.max;
        }
      }

      if ( filtrationCriteria.balance ) {
        conditions[ "balance" ] = {};
        if ( filtrationCriteria.balance.min ) {
          conditions[ "balance" ].$gte = filtrationCriteria.balance.min;
        }
        if ( filtrationCriteria.balance.max ) {
          conditions[ "balance" ].$lte = filtrationCriteria.balance.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.powertel.airtime.SortCriteria ): Promise<string> => {

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

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.powertel.airtime.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.checkpoint ) {
        document.checkpoint = details.checkpoint;
      }

      if ( details.newStockValuePlus ) {
        document.newStockValue += details.newStockValuePlus;
      }
      if ( details.newStockValueMinus ) {
        document.newStockValue -= details.newStockValueMinus;
      }
      if ( details.newStockValue ) {
        document.newStockValue = details.newStockValue;
      }

      if ( details.amountSoldPlus ) {
        document.amountSold += details.amountSoldPlus;
      }
      if ( details.amountSoldMinus ) {
        document.amountSold -= details.amountSoldMinus;
      }
      if ( details.amountSold ) {
        document.amountSold = details.amountSold;
      }

      if ( details.balancePlus ) {
        document.balance += details.balancePlus;
      }
      if ( details.balanceMinus ) {
        document.balance -= details.balanceMinus;
      }
      if ( details.balance ) {
        document.balance = details.balance;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( airtimes: Model[], forceThrow = false ): Promise<dataModel.powertel.airtime.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<dataModel.powertel.airtime.Super[]>(( resolve, reject ) => {

          let returnAirtimes: dataModel.powertel.airtime.Super[] = [];

          airtimes.forEach(( airtime ) => {

            let returnAirtime: dataModel.powertel.airtime.Super = {
              id: ( <mongoose.Types.ObjectId>airtime._id ).toHexString(),
              checkpoint: airtime.checkpoint,
              newStockValue: airtime.newStockValue,
              amountSold: airtime.amountSold,
              balance: airtime.balance,
              createdAt: airtime.createdAt,
              updatedAt: airtime.updatedAt
            };

            returnAirtimes.push( returnAirtime );

          } );

          resolve( returnAirtimes );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "checkpoint"?: { $gte?: Date; $lte?: Date; };
  "newStockValue"?: { $gte?: number; $lte?: number; };
  "amountSold"?: { $gte?: number; $lte?: number; };
  "balance"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: src.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.powertel.Airtime => {
  return new MongoAirtime( {
    events: eventsFactory( params.emitEvent ),
    Model: AirtimeMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
