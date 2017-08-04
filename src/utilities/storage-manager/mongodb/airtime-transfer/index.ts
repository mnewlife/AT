/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { AirtimeTransferModel, AirtimeTransferMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageAirtimeTransfer extends MongoController implements interfaces.utilities.storageManager.StorageAirtimeTransfer {

  /*****************************************************************/

  constructor( protected readonly emitter: interfaces.utilities.storageManager.airtimeTransfer.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter, Model, mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: interfaces.dataModel.getParams.airtimeTransfer.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.airtimeTransfer.SortCriteria, limit: number, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: "",
      sortCriteria: "",
      limit: 0
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.makeSortCriteria( sortCriteria );

      } )
      .then(( retrievedSortCriteria: string ) => {

        if ( retrievedSortCriteria ) {
          params.sortCriteria = retrievedSortCriteria;
        }

        if ( limit ) {
          params.limit = limit;
        }

        return Promise.resolve();

      } )
      .then(( response: any ) => {

        return this.find( params.conditions, params.sortCriteria, params.limit );

      } )
      .then(( foundAirtimeTransfers: interfaces.dataModel.AirtimeTransfer[] ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundAirtimeTransfers.length
          } );

          resolve();

        } )
          .catch(( reason: any ) => {

            console.log( "Event Emit Failed: " + JSON.stringify( reason ) );

          } );;

        return Promise.resolve( foundAirtimeTransfers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );

          resolve();

        } )
          .catch(( reason: any ) => {

            console.log( "Event Emit Failed: " + JSON.stringify( reason ) );

          } );;

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( transferId: mongoose.Types.ObjectId, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( transferId );

      } )
      .then(( foundAirtimeTransfer: interfaces.dataModel.AirtimeTransfer ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: transferId
          } );

        } );

        return Promise.resolve( foundAirtimeTransfer );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: transferId,
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Event Emit Failed: " + JSON.stringify( reason ) );

          } );;

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

  readonly addBatch = ( transfers: interfaces.utilities.storageManager.airtimeTransfer.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( transfers.map(( transfer ) => {

          return {
            userId: transfer.userId,
            channelId: transfer.channelId,
            paymentId: transfer.paymentId,
            transferDetails: {
              identifier: transfer.transferDetails.identifier,
              amount: transfer.transferDetails.amount
            },
            paymentRecorded: transfer.paymentRecorded
          };

        } ) );

      } )
      .then(( airtimeTransfers: interfaces.dataModel.AirtimeTransfer[] ) => {

        new Promise<any>(( resolve, reject ) => {

          airtimeTransfers.forEach(( airtimeTransfer: interfaces.dataModel.AirtimeTransfer ) => {

            this.emitter.added( {
              document: airtimeTransfer
            } );

          } );

          resolve();

        } );

        return Promise.resolve( airtimeTransfers );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: transfers,
            reason: reason
          } );

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

  readonly add = ( userId: mongoose.Types.ObjectId, channelId: mongoose.Types.ObjectId, paymentId: mongoose.Types.ObjectId, transferDetails: interfaces.dataModel.TransferDetails, paymentRecorded: boolean, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          userId: userId,
          channelId: channelId,
          paymentId: paymentId,
          transferDetails: {
            identifier: transferDetails.identifier,
            amount: transferDetails.amount
          },
          paymentRecorded: paymentRecorded
        } );

      } )
      .then(( airtimeTransfer: AirtimeTransferModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: airtimeTransfer
          } );

        } );

        return Promise.resolve( airtimeTransfer );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              userId: userId,
              channelId: channelId,
              paymentId: paymentId,
              transferDetails: transferDetails,
              paymentRecorded: paymentRecorded
            },
            reason: reason
          } );

        } )
          .catch(( reason: any ) => {

            console.log( "Event Emit Failed: " + reason );

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

  readonly update = ( filtrationCriteria: interfaces.dataModel.getParams.airtimeTransfer.FiltrationCriteria, details: interfaces.utilities.storageManager.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: "",
      details: ""
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        if ( details ) {
          params.details = details;
        }

        return this.updateDocuments( params.conditions, params.details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.AirtimeTransfer[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.AirtimeTransfer ) => {

            this.emitter.updated( {
              conditions: filtrationCriteria,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            details: details,
            reason: reason
          } );

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

  readonly updateById = ( transferId: mongoose.Types.ObjectId, details: interfaces.utilities.storageManager.airtimeTransfer.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        params.conditions = {
          "_id": transferId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.AirtimeTransfer[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.AirtimeTransfer ) => {

            this.emitter.updated( {
              id: transferId,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: transferId,
            details: details,
            reason: reason
          } );

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

  readonly remove = ( filtrationCriteria: interfaces.dataModel.getParams.airtimeTransfer.FiltrationCriteria, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            conditions: filtrationCriteria
          } );

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

  readonly removeById = ( transferId: mongoose.Types.ObjectId, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": transferId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: transferId
          } );

        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: transferId,
            reason: reason
          } );

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

  private readonly makeConditions = ( filtrationCriteria: interfaces.dataModel.getParams.airtimeTransfer.FiltrationCriteria ): Promise<any> => {

    let conditions: any = {};

    return new Promise<any>(( resolve, reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "channelId" ) ) {
        conditions[ "channelId" ] = filtrationCriteria.channelId;
      }

      if ( filtrationCriteria.hasOwnProperty( "paymentId" ) ) {
        conditions[ "paymentId" ] = filtrationCriteria.paymentId;
      }

      if ( filtrationCriteria.hasOwnProperty( "transferIdentifier" ) ) {
        conditions[ "transferDetails.identifier" ] = filtrationCriteria.transferIdentifier;
      }

      if ( filtrationCriteria.hasOwnProperty( "transferAmountMin" ) || filtrationCriteria.hasOwnProperty( "transferAmountMax" ) ) {
        conditions[ "transferDetails.amount" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "transferAmountMin" ) ) {
        conditions[ "transferDetails.amount" ].$gte = filtrationCriteria.transferAmountMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "transferAmountMax" ) ) {
        conditions[ "transferDetails.amount" ].$lte = filtrationCriteria.transferAmountMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "paymentRecorded" ) ) {
        conditions[ "paymentRecorded" ] = filtrationCriteria.paymentRecorded;
      }

      if ( filtrationCriteria.hasOwnProperty( "textSearch" ) ) {
        conditions.$text = {
          $search: filtrationCriteria.textSearch
        };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: interfaces.dataModel.getParams.airtimeTransfer.SortCriteria ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let sortString: string;
      let criteria: string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      if ( sortCriteria.criteria == "transferAmount" ) {
        criteria = "transferDetails.amount";
      } else {
        criteria = sortCriteria.criteria;
      }

      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + criteria;
      } else {
        sortString = criteria;
      }

      resolve( sortString );

    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( details: interfaces.utilities.storageManager.airtimeTransfer.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.channelId ) {
        updateDetails.channelId = details.channelId;
      }

      if ( details.paymentId ) {
        updateDetails.paymentId = details.paymentId;
      }

      if ( details.transferDetails && ( details.transferDetails.identifier || details.transferDetails.amount ) ) {

        updateDetails.transferDetails = {};

        if ( details.transferDetails.identifier ) {
          updateDetails.transferDetails.identifier = details.transferDetails.identifier;
        }

        if ( details.transferDetails.amount ) {
          updateDetails.transferDetails.amount = details.transferDetails.amount;
        }

      }

      if ( details.paymentRecorded ) {
        updateDetails.paymentRecorded = details.paymentRecorded;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: interfaces.utilities.sharedLogic.dataStructures.MapDetails ): interfaces.utilities.storageManager.StorageAirtimeTransfer => {

  return new MongoStorageAirtimeTransfer( emitterFactory( emitEvent ), AirtimeTransferMongooseModel, mapDetails );

}

/******************************************************************************/
