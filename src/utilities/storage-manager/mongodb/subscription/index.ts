/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import * as events from "../../../../interfaces/events/utilities/storage-manager/shop/index";
import * as getParams from "../../../../interfaces/data-model/get-params/shop/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as shopInterfaces from "../../../../interfaces/utilities/storage-manager/shop/index";

import MongoController from "../mongo-controller/index";
import { SubscriptionModel, SubscriptionMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageSubscription extends MongoController implements interfaces.utilities.storageManager.StorageSubscription {

  /*****************************************************************/

  constructor( protected readonly emitter: interfaces.utilities.storageManager.subscription.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter, Model, mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.subscription.SortCriteria, limit: number, forceThrow = false ): Promise<any> => {

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
      .then(( foundSubscriptions: interfaces.dataModel.Subscription[] ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundSubscriptions.length
          } );

          resolve();

        } );

        return Promise.resolve( foundSubscriptions );

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

  readonly getById = ( subscriptionId: mongoose.Types.ObjectId, forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( subscriptionId );

      } )
      .then(( foundSubscription: interfaces.dataModel.Subscription ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: subscriptionId
          } );

        } );

        return Promise.resolve( foundSubscription );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: subscriptionId,
            reason: reason
          } );

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

  readonly addBatch = ( subscriptions: interfaces.utilities.storageManager.subscription.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( subscriptions.map(( subscription ) => {

          return {
            userId: subscription.userId,
            subscription: subscription.subscription
          };

        } ) );

      } )
      .then(( subscriptions: interfaces.dataModel.Subscription[] ) => {

        new Promise<any>(( resolve, reject ) => {

          subscriptions.forEach(( subscription: interfaces.dataModel.Subscription ) => {

            this.emitter.added( {
              document: subscription
            } );

          } );

          resolve();

        } );

        return Promise.resolve( subscriptions );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: subscriptions,
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

  readonly add = ( userId: mongoose.Types.ObjectId, subscription: string, forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          userId: userId,
          subscription: subscription
        } );

      } )
      .then(( subscription: SubscriptionModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: subscription
          } );

        } );

        return Promise.resolve( subscription );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              userId: userId,
              subscription: subscription
            },
            reason: reason
          } );

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

  readonly update = ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, details: interfaces.utilities.storageManager.subscription.UpdateDetails, forceThrow = false ): Promise<any> => {

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
      .then(( updatedDocuments: interfaces.dataModel.Subscription[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Subscription ) => {

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

  readonly updateById = ( subscriptionId: mongoose.Types.ObjectId, details: interfaces.utilities.storageManager.subscription.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        params.conditions = {
          "_id": subscriptionId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.Subscription[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Subscription ) => {

            this.emitter.updated( {
              id: subscriptionId,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: subscriptionId,
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

  readonly remove = ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, forceThrow = false ): Promise<any> => {

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

  readonly removeById = ( subscriptionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": subscriptionId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: subscriptionId
          } );

        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: subscriptionId,
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

  private readonly makeConditions = ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria ): Promise<any> => {

    let conditions: any = {};

    return new Promise<any>(( resolve, reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "subscription" ) ) {
        conditions[ "subscription" ] = filtrationCriteria.subscription;
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

  private readonly makeSortCriteria = ( sortCriteria: interfaces.dataModel.getParams.subscription.SortCriteria ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let sortString: string;
      let criteria: string;

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

  private readonly generateUpdateDetails = ( details: interfaces.utilities.storageManager.subscription.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.subscription ) {
        updateDetails.subscription = details.subscription;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: interfaces.utilities.sharedLogic.dataStructures.MapDetails ): interfaces.utilities.storageManager.StorageSubscription => {

  return new MongoStorageSubscription( emitterFactory( emitEvent ), SubscriptionMongooseModel, mapDetails );

}

/******************************************************************************/
