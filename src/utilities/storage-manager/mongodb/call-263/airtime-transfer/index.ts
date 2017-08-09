/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, AirtimeTransferMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoAirtimeTransfer extends MongoController implements storageManagerInterfaces.call263.AirtimeTransfer {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.call263.airtimeTransfer.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.call263.airtimeTransfer.Emitter;
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

  readonly get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

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
      .then(( foundAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( foundAirtimeTransfers );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedAirtimeTransfers.map(( airtimeTransfer ) => {
              return airtimeTransfer.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers );

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

  readonly getById = ( airtimeTransferId: string, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeTransferId ) );

      } )
      .then(( foundAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ foundAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: airtimeTransferId
          } );
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: airtimeTransferId,
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

  readonly addBatch = ( airtimeTransfers: storageManagerInterfaces.call263.airtimeTransfer.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( airtimeTransfers.map(( airtimeTransfer ) => {
          let airtimeTransferDetails: Model_Partial = {
            userId: mongoose.Types.ObjectId( airtimeTransfer.userId ),
            channelId: mongoose.Types.ObjectId( airtimeTransfer.userId ),
            paymentId: mongoose.Types.ObjectId( airtimeTransfer.userId ),
            transfer: {
              identifier: airtimeTransfer.transfer.identifier,
              amount: airtimeTransfer.transfer.amount,
              paymentRecorded: airtimeTransfer.transfer.paymentRecorded,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          };
          return airtimeTransferDetails;
        } ) );

      } )
      .then(( addedAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( addedAirtimeTransfers );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: airtimeTransfers,
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

  readonly add = ( details: storageManagerInterfaces.call263.airtimeTransfer.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let airtimeTransferDetails: Model_Partial = {
          userId: mongoose.Types.ObjectId( details.userId ),
          channelId: mongoose.Types.ObjectId( details.userId ),
          paymentId: mongoose.Types.ObjectId( details.userId ),
          transfer: {
            identifier: details.transfer.identifier,
            amount: details.transfer.amount,
            paymentRecorded: details.transfer.paymentRecorded,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        };

        return this.saveDocument( airtimeTransferDetails );

      } )
      .then(( addedAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ addedAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

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

  readonly update = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, details: storageManagerInterfaces.call263.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundAirtimeTransfers: Model[] ) => {

        return Promise.all( foundAirtimeTransfers.map(( airtimeTransfer ) => {

          return this.generateUpdateDetails( airtimeTransfer, details )
            .then(( fedAirtimeTransfer: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedAirtimeTransfer.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedAirtimeTransfer );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedAirtimeTransfers: Model[] ) => {

        return this.convertToAbstract( updatedAirtimeTransfers );

      } )
      .then(( updatedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( updatedAirtimeTransfers );

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

  readonly updateById = ( airtimeTransferId: string, details: storageManagerInterfaces.call263.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => {

    let airtimeTransferObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( airtimeTransferId ) );

      } )
      .then(( airtimeTransfer: Model ) => {

        return this.generateUpdateDetails( airtimeTransfer, details )
          .then(( fedAirtimeTransfer: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedAirtimeTransfer.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedAirtimeTransfer );
                }
              } );
            } );

          } );

      } )
      .then(( updatedAirtimeTransfer: Model ) => {

        return this.convertToAbstract( [ updatedAirtimeTransfer ] );

      } )
      .then(( convertedAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: airtimeTransferId,
            documents: convertedAirtimeTransfers
          } );
          resolve();
        } );

        return Promise.resolve( convertedAirtimeTransfers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: airtimeTransferId,
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

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

  readonly removeById = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( airtimeTransferId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: airtimeTransferId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: airtimeTransferId,
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

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.userId ) {
        conditions[ "userId" ] = mongoose.Types.ObjectId( filtrationCriteria.userId );
      }
      if ( filtrationCriteria.channelId ) {
        conditions[ "channelId" ] = mongoose.Types.ObjectId( filtrationCriteria.channelId );
      }
      if ( filtrationCriteria.paymentId ) {
        conditions[ "paymentId" ] = mongoose.Types.ObjectId( filtrationCriteria.paymentId );
      }

      if ( filtrationCriteria.transfer ) {
        if ( filtrationCriteria.transfer.identifier ) {
          conditions[ "transfer.identifier" ] = filtrationCriteria.transfer.identifier;
        }
        if ( filtrationCriteria.transfer.amount ) {
          conditions[ "transfer.amount" ] = {};
          if ( filtrationCriteria.transfer.amount.min ) {
            conditions[ "transfer.amount" ].$gte = filtrationCriteria.transfer.amount.min;
          }
          if ( filtrationCriteria.transfer.amount.max ) {
            conditions[ "transfer.amount" ].$lte = filtrationCriteria.transfer.amount.max;
          }
        }
        if ( filtrationCriteria.transfer.paymentRecorded ) {
          conditions[ "transfer.paymentRecorded" ] = filtrationCriteria.transfer.paymentRecorded;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.call263.airtimeTransfer.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      if ( sortCriteria.criteria === "amount" ) {
        sortString = "transfer.amount";
      } else {
        sortString = sortCriteria.criteria;
      }
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.call263.airtimeTransfer.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.userId ) {
        document.userId = mongoose.Types.ObjectId( details.userId );
      }

      if ( details.channelId ) {
        document.channelId = mongoose.Types.ObjectId( details.channelId );
      }

      if ( details.paymentId ) {
        document.paymentId = mongoose.Types.ObjectId( details.paymentId );
      }

      if ( details.transfer ) {
        if ( details.transfer.identifier ) {
          document.transfer.identifier = details.transfer.identifier;
        }
        if ( details.transfer.amount ) {
          document.transfer.amount = details.transfer.amount;
        }
        if ( details.transfer.paymentRecorded ) {
          document.transfer.paymentRecorded = details.transfer.paymentRecorded;
        }
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( airtimeTransfers: Model[], forceThrow = false ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>(( resolve, reject ) => {

          let returnAirtimeTransfers: interfaces.dataModel.call263.airtimeTransfer.Super[] = [];

          airtimeTransfers.forEach(( airtimeTransfer ) => {

            let returnAirtimeTransfer: interfaces.dataModel.call263.airtimeTransfer.Super = {
              id: ( <mongoose.Types.ObjectId>airtimeTransfer._id ).toHexString(),
              userId: ( <mongoose.Types.ObjectId>airtimeTransfer.userId ).toHexString(),
              channelId: ( <mongoose.Types.ObjectId>airtimeTransfer.channelId ).toHexString(),
              paymentId: ( <mongoose.Types.ObjectId>airtimeTransfer.paymentId ).toHexString(),
              transfer: {
                id: ( <mongoose.Types.ObjectId>airtimeTransfer._id ).toHexString(),
                identifier: airtimeTransfer.transfer.identifier,
                amount: airtimeTransfer.transfer.amount,
                paymentRecorded: airtimeTransfer.transfer.paymentRecorded,
                createdAt: airtimeTransfer.transfer.createdAt,
                updatedAt: airtimeTransfer.transfer.updatedAt
              },
              createdAt: airtimeTransfer.createdAt,
              updatedAt: airtimeTransfer.updatedAt
            };

            returnAirtimeTransfers.push( returnAirtimeTransfer );

          } );

          resolve( returnAirtimeTransfers );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "userId"?: mongoose.Types.ObjectId;
  "channelId"?: mongoose.Types.ObjectId;
  "paymentId"?: mongoose.Types.ObjectId;

  "transfer.identifier"?: string;
  "transfer.amount"?: { $gte?: number; $lte?: number; };
  "transfer.paymentRecorded"?: boolean;

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageManagerInterfaces.call263.AirtimeTransfer => {
  return new MongoAirtimeTransfer( {
    emitter: emitterFactory( params.emitEvent ),
    Model: AirtimeTransferMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
