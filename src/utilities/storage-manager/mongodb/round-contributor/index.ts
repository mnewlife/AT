/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { RoundContributorModel , RoundContributorMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageRoundContributor extends MongoController implements interfaces.utilities.storageManager.StorageRoundContributor {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.roundContributor.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.roundContributor.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundRoundContributors : interfaces.dataModel.RoundContributor[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundRoundContributors.length
          } );

          resolve();

        } );

        return Promise.resolve( foundRoundContributors );

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

  readonly getById = ( roundContributorId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( roundContributorId );

      } )
      .then( ( foundRoundContributor : interfaces.dataModel.RoundContributor ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : roundContributorId
          } );

        } );

        return Promise.resolve( foundRoundContributor );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : roundContributorId ,
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

  readonly addBatch = ( roundContributors : interfaces.utilities.storageManager.roundContributor.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( roundContributors.map( ( roundContributor ) => {

          return {
            roundId : roundContributor.roundId ,
            userId : roundContributor.userId ,
            numContributions : 0 ,
            totalValueContributions : 0 ,
            contributionsDue : 0 ,
            tracks : [] ,
            numCartProducts : 0 ,
            costCart : 0 ,
            deliveryFeesPaid : 0
          };

        } ) );

      } )
      .then( ( roundContributors : interfaces.dataModel.RoundContributor[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          roundContributors.forEach( ( roundContributor : interfaces.dataModel.RoundContributor ) => {

            this.emitter.added( {
              document : roundContributor
            } );

          } );

          resolve();

        } );

        return Promise.resolve( roundContributors );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : roundContributors ,
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

  readonly add = ( roundId : mongoose.Types.ObjectId , userId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        roundId : roundId ,
        userId : userId ,
        numContributions : 0 ,
        totalValueContributions : 0 ,
        contributionsDue : 0 ,
        tracks : [] ,
        numCartProducts : 0 ,
        costCart : 0 ,
        deliveryFeesPaid : 0
      } );

    } )
    .then( ( roundContributor : RoundContributorModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : roundContributor
        } );

      } );

      return Promise.resolve( roundContributor );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            roundId : roundId ,
            userId : userId ,
            numContributions : 0 ,
            totalValueContributions : 0 ,
            contributionsDue : 0 ,
            tracks : [] ,
            numCartProducts : 0 ,
            costCart : 0 ,
            deliveryFeesPaid : 0
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria , details : interfaces.utilities.storageManager.roundContributor.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.RoundContributor[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.RoundContributor ) => {

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

  readonly updateById = ( roundContributorId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.roundContributor.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : roundContributorId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.RoundContributor[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.RoundContributor ) => {

            this.emitter.updated( {
              id : roundContributorId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : roundContributorId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( roundContributorId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : roundContributorId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : roundContributorId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : roundContributorId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.roundContributor.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "roundId" ) ) {
        conditions[ "roundId" ] = filtrationCriteria.roundId;
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "numContributionsMin" ) ) {
        conditions[ "numContributions" ].$gte = filtrationCriteria.numContributionsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numContributionsMax" ) ) {
        conditions[ "numContributions" ].$lte = filtrationCriteria.numContributionsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "contributionsDueMin" ) ) {
        conditions[ "contributionsDue" ].$gte = filtrationCriteria.contributionsDueMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "contributionsDueMax" ) ) {
        conditions[ "contributionsDue" ].$lte = filtrationCriteria.contributionsDueMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "trackId" ) ) {
        conditions[ "tracks" ] = {};
        conditions[ "tracks" ].$all = [ {
          "$elemMatch" : { trackId : filtrationCriteria.trackId }
        } ];
      }

      if ( filtrationCriteria.hasOwnProperty( "numCartProductsMin" ) ) {
        conditions[ "numCartProducts" ].$gte = filtrationCriteria.numCartProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numCartProductsMax" ) ) {
        conditions[ "numCartProducts" ].$lte = filtrationCriteria.numCartProductsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "costCartMin" ) ) {
        conditions[ "costCart" ].$gte = filtrationCriteria.costCartMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "costCartMax" ) ) {
        conditions[ "costCart" ].$lte = filtrationCriteria.costCartMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "deliveryFeesPaidMin" ) ) {
        conditions[ "deliveryFeesPaid" ].$gte = filtrationCriteria.deliveryFeesPaidMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "deliveryFeesPaidMax" ) ) {
        conditions[ "deliveryFeesPaid" ].$lte = filtrationCriteria.deliveryFeesPaidMax;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.roundContributor.SortCriteria ) : Promise<any> => {

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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.roundContributor.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      let crudes : any[] = [
        "roundId" ,
        "userId" ,
        "numContributions" ,
        "totalValueContributions" ,
        "contributionsDue" ,
        "tracks" ,
        "numCartProducts" ,
        "costCart" ,
        "deliveryFeesPaid"
      ];

      crudes.forEach( ( detail : any ) => {
        if ( details[ detail ] ) {
          updateDetails[ detail ] = details[ detail ];
        }
      } );

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageRoundContributor => {

  return new MongoStorageRoundContributor( emitterFactory( emitEvent ) , RoundContributorMongooseModel , mapDetails );

}

/******************************************************************************/
