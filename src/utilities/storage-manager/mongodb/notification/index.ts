/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { NotificationModel , NotificationMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageNotification extends MongoController implements interfaces.utilities.storageManager.StorageNotification {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.notification.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.notification.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.notification.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundNotifications : interfaces.dataModel.Notification[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundNotifications.length
          } );

          resolve();

        } );

        return Promise.resolve( foundNotifications );

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

  readonly getById = ( notificationId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( notificationId );

      } )
      .then( ( foundNotification : interfaces.dataModel.Notification ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : notificationId
          } );

        } );

        return Promise.resolve( foundNotification );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : notificationId ,
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

  readonly addBatch = ( notifications : interfaces.utilities.storageManager.notification.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( notifications.map( ( notification ) => {

          return {
            userId : notification.userId ,
            app : notification.app ,
            type : notification.type ,
            label : notification.label ,
            seen : false ,
            claered : false
          };

        } ) );

      } )
      .then( ( notifications : interfaces.dataModel.Notification[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          notifications.forEach( ( notification : interfaces.dataModel.Notification ) => {

            this.emitter.added( {
              document : notification
            } );

          } );

          resolve();

        } );

        return Promise.resolve( notifications );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : notifications ,
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

  readonly add = ( userId : mongoose.Types.ObjectId , app : interfaces.AppName , type : interfaces.dataModel.NotificationType , label : string , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        app : app ,
        type : type ,
        label : label
      } );

    } )
    .then( ( notification : NotificationModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : notification
        } );

      } );

      return Promise.resolve( notification );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            app : app ,
            type : type ,
            label : label
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.notification.FiltrationCriteria , details : interfaces.utilities.storageManager.notification.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Notification[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Notification ) => {

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

  readonly updateById = ( notificationId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.notification.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : notificationId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Notification[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Notification ) => {

            this.emitter.updated( {
              id : notificationId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : notificationId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.notification.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( notificationId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : notificationId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : notificationId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : notificationId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.notification.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "app" ) ) {
        conditions[ "app" ] = filtrationCriteria.app;
      }

      if ( filtrationCriteria.hasOwnProperty( "type" ) ) {
        conditions[ "type" ] = filtrationCriteria.type;
      }

      if ( filtrationCriteria.hasOwnProperty( "seen" ) ) {
        conditions[ "seen" ] = filtrationCriteria.seen;
      }

      if ( filtrationCriteria.hasOwnProperty( "cleared" ) ) {
        conditions[ "cleared" ] = filtrationCriteria.cleared;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.notification.SortCriteria ) : Promise<any> => {

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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.notification.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.app ) {
        updateDetails.app = details.app;
      }

      if ( details.type ) {
        updateDetails.type = details.type;
      }

      if ( details.label ) {
        updateDetails.label = details.label;
      }

      if ( details.seen ) {
        updateDetails.seen = details.seen;
      }

      if ( details.cleared ) {
        updateDetails.cleared = details.cleared;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageNotification => {

  return new MongoStorageNotification( emitterFactory( emitEvent ) , NotificationMongooseModel , mapDetails );

}

/******************************************************************************/
