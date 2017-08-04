/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { PaymentModel , PaymentMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStoragePayment extends MongoController implements interfaces.utilities.storageManager.StoragePayment {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.payment.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.payment.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.payment.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : "" ,
      sortCriteria : "" ,
      limit : 0
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then( ( conditions : any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.makeSortCriteria( sortCriteria );

      } )
      .then( ( retrievedSortCriteria : string ) => {

        if ( retrievedSortCriteria ) {
          params.sortCriteria = retrievedSortCriteria;
        }

        if ( limit ) {
          params.limit = limit;
        }

        return Promise.resolve();

      } )
      .then( ( response : any ) => {

        return this.find( params.conditions , params.sortCriteria , params.limit );

      } )
      .then( ( foundPayments : interfaces.dataModel.Payment[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundPayments.length
          } );

          resolve();

        } );

        return Promise.resolve( foundPayments );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getFailed( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            reason : reason
          } );

          resolve();

        } );

        return Promise.reject( {
          identifier : "GetFailed" ,
          data : {
            reason : reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( paymentId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( paymentId );

      } )
      .then( ( foundPayment : interfaces.dataModel.Payment ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : paymentId
          } );

        } );

        return Promise.resolve( foundPayment );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : paymentId ,
            reason : reason
          } );

        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier : "DocumentNotFound" ,
            data : {
              reason : reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier : "GetByIdFailed" ,
            data : {
              reason : reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( payments : interfaces.utilities.storageManager.payment.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( payments.map( ( payment ) => {

          return {
            userId : payment.userId ,
            channelId : payment.channelId ,
            transactionDetails : payment.transactionDetails ,
            transferDone : payment.transferDone
          };

        } ) );

      } )
      .then( ( payments : interfaces.dataModel.Payment[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          payments.forEach( ( payment : interfaces.dataModel.Payment ) => {

            this.emitter.added( {
              document : payment
            } );

          } );

          resolve();

        } );

        return Promise.resolve( payments );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : payments ,
            reason : reason
          } );

        } );

        return Promise.reject( {
          identifier : "AddBatchFailed" ,
          data : {
            reason : reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( userId : mongoose.Types.ObjectId , channelId : mongoose.Types.ObjectId , transactionDetails : interfaces.dataModel.TransactionDetails , transferDone : boolean , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        channelId : channelId ,
        transactionDetails : transactionDetails ,
        trasferDone : transferDone
      } );

    } )
    .then( ( payment : PaymentModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : payment
        } );

      } );

      return Promise.resolve( payment );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            channelId : channelId ,
            transactionDetails : transactionDetails ,
            trasferDone : transferDone
          } ,
          reason : reason
        } );

      } );

      return Promise.reject( {
        identifier : "AddFailed" ,
        data : {
          reason : reason
        }
      } );

    } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.payment.FiltrationCriteria , details : interfaces.utilities.storageManager.payment.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : "" ,
      details : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then( ( conditions : any ) => {

        if ( conditions ) {
          params.conditions = conditions;
        }

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        if ( details ) {
          params.details = details;
        }

        return this.updateDocuments( params.conditions , params.details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Payment[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Payment ) => {

            this.emitter.updated( {
              conditions : filtrationCriteria ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            conditions : filtrationCriteria ,
            details : details ,
            reason : reason
          } );

        } );

        return Promise.reject( {
          identifier : "UpdateFailed" ,
          data : {
            reason : reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( paymentId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.payment.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : paymentId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Payment[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Payment ) => {

            this.emitter.updated( {
              id : paymentId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : paymentId ,
            details : details ,
            reason : reason
          } );

        } );

        return Promise.reject( {
          identifier : "UpdateFailed" ,
          data : {
            reason : reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.payment.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.makeConditions( filtrationCriteria );

    } )
    .then( ( conditions : any ) => {

      return this.removeDocuments( conditions );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          conditions : filtrationCriteria
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          conditions : filtrationCriteria ,
          reason : reason
        } );

        resolve();

      } );

      return Promise.reject( {
        identifier : "RemoveFailed" ,
        data : {
          reason : reason
        }
      } );

    } );

  }

  /*****************************************************************/

  readonly removeById = ( paymentId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : paymentId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : paymentId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : paymentId ,
          reason : reason
        } );

      } );

      return Promise.reject( {
        identifier : "RemoveFailed" ,
        data : {
          reason : reason
        }
      } );

    } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.payment.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "channelId" ) ) {
        conditions[ "channelId" ] = filtrationCriteria.channelId;
      }

      if ( filtrationCriteria.hasOwnProperty( "transactionIdentifier" ) ) {
        conditions[ "transactionDetails.identifier" ] = filtrationCriteria.transactionIdentifier;
      }

      if ( filtrationCriteria.hasOwnProperty( "transactionAmountMin" ) || filtrationCriteria.hasOwnProperty( "transactionAmountMax" ) ) {
        conditions[ "transactionDetails.amount" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "transactionAmountMin" ) ) {
        conditions[ "transactionDetails.amount" ].$gte = filtrationCriteria.transactionAmountMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "transactionAmountMax" ) ) {
        conditions[ "transactionDetails.amount" ].$lte = filtrationCriteria.transactionAmountMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "transactionMethod" ) ) {
        conditions[ "transactionDetails.method" ] = filtrationCriteria.transactionMethod;
      }

      if ( filtrationCriteria.hasOwnProperty( "textSearch" ) ) {
        conditions.$text = {
          $search : filtrationCriteria.textSearch
        };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.payment.SortCriteria ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      let sortString : string;
      let criteria : string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      criteria = sortCriteria.criteria;

      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + criteria;
      } else {
        sortString = criteria;
      }

      resolve( sortString );

    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.payment.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.channelId ) {
        updateDetails.channelId = details.channelId;
      }

      if ( details.transactionDetails ) {
        if ( details.transactionDetails.identifier || details.transactionDetails.amount || details.transactionDetails.method ) {
          updateDetails.transactionDetails = {};
          if ( details.transactionDetails.identifier ) {
            updateDetails.transactionDetails.identifier = details.transactionDetails.identifier;
          }
          if ( details.transactionDetails.amount ) {
            updateDetails.transactionDetails.amount = details.transactionDetails.amount;
          }
          if ( details.transactionDetails.method ) {
            updateDetails.transactionDetails.method = details.transactionDetails.method;
          }
        }
      }

      if ( details.transferDone ) {
        updateDetails.transferDone = details.transferDone;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StoragePayment => {

  return new MongoStoragePayment( emitterFactory( emitEvent ) , PaymentMongooseModel , mapDetails );

}

/******************************************************************************/
