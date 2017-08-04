/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { RoundModel , RoundMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageRound extends MongoController implements interfaces.utilities.storageManager.StorageRound {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.round.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.round.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.round.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundRounds : interfaces.dataModel.Round[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundRounds.length
          } );

          resolve();

        } );

        return Promise.resolve( foundRounds );

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

  readonly getById = ( roundId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( roundId );

      } )
      .then( ( foundRound : interfaces.dataModel.Round ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : roundId
          } );

        } );

        return Promise.resolve( foundRound );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : roundId ,
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

  readonly addBatch = ( rounds : interfaces.utilities.storageManager.round.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( rounds.map( ( round ) => {

          return {
            roundName : round.roundName ,
            inProgress : false ,
            duration : round.duration ,
            deliveryFee : ( round.deliveryFee ) ? round.deliveryFee : 0 ,
            numContributions : 0 ,
            totalValueContributions : 0 ,
            numContributors : 0 ,
            numDeliveryFees : 0 ,
            totalDeliveryFees : 0 ,
            numTracks : 0 ,
            totalValueCartProducts : 0
          };

        } ) );

      } )
      .then( ( rounds : interfaces.dataModel.Round[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          rounds.forEach( ( round : interfaces.dataModel.Round ) => {

            this.emitter.added( {
              document : round
            } );

          } );

          resolve();

        } );

        return Promise.resolve( rounds );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : rounds ,
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

  readonly add = ( roundName : string , duration : interfaces.dataModel.RoundDuration , deliveryFee? : number , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        roundName : roundName ,
        inProgress : false ,
        duration : duration ,
        deliveryFee : ( deliveryFee ) ? deliveryFee : 0 ,
        numContributions : 0 ,
        totalValueContributions : 0 ,
        numContributors : 0 ,
        numDeliveryFees : 0 ,
        totalDeliveryFees : 0 ,
        numTracks : 0 ,
        totalValueCartProducts : 0
      } );

    } )
    .then( ( round : RoundModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : round
        } );

      } );

      return Promise.resolve( round );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            roundName : roundName ,
            inProgress : false ,
            duration : duration ,
            deliveryFee : ( deliveryFee ) ? deliveryFee : 0 ,
            numContributions : 0 ,
            totalValueContributions : 0 ,
            numContributors : 0 ,
            numDeliveryFees : 0 ,
            totalDeliveryFees : 0 ,
            numTracks : 0 ,
            totalValueCartProducts : 0
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.round.FiltrationCriteria , details : interfaces.utilities.storageManager.round.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Round[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Round ) => {

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

  readonly updateById = ( roundId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.round.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : roundId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Round[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Round ) => {

            this.emitter.updated( {
              id : roundId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : roundId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.round.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( roundId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : roundId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : roundId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : roundId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.round.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "inProgress" ) ) {
        conditions[ "inProgress" ] = filtrationCriteria.inProgress;
      }

      if ( filtrationCriteria.hasOwnProperty( "startMin" ) || filtrationCriteria.hasOwnProperty( "startMax" ) ) {
        conditions[ "duration.start" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "startMin" ) ) {
        conditions[ "duration.start" ].$gte = filtrationCriteria.startMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "startMax" ) ) {
        conditions[ "duration.start" ].$lte = filtrationCriteria.startMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "endMin" ) || filtrationCriteria.hasOwnProperty( "endMax" ) ) {
        conditions[ "duration.end" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "endMin" ) ) {
        conditions[ "duration.end" ].$gte = filtrationCriteria.endMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "endMax" ) ) {
        conditions[ "duration.end" ].$lte = filtrationCriteria.endMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "span" ) ) {
        conditions[ "duration.span" ] = filtrationCriteria.span;
      }

      if ( filtrationCriteria.hasOwnProperty( "deliveryFeeMin" ) ) {
        conditions[ "deliveryFee" ].$gte = filtrationCriteria.deliveryFeeMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "deliveryFeeMax" ) ) {
        conditions[ "deliveryFee" ].$lte = filtrationCriteria.deliveryFeeMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numContributionsMin" ) ) {
        conditions[ "numContributions" ].$gte = filtrationCriteria.numContributionsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numContributionsMax" ) ) {
        conditions[ "numContributions" ].$lte = filtrationCriteria.numContributionsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "totalValueContributionsMin" ) ) {
        conditions[ "totalValueContributions" ].$gte = filtrationCriteria.totalValueContributionsMax;
      }
      if ( filtrationCriteria.hasOwnProperty( "numContributionsMax" ) ) {
        conditions[ "totalValueContributions" ].$lte = filtrationCriteria.totalValueContributionsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numContributorsMin" ) ) {
        conditions[ "numContributors" ].$gte = filtrationCriteria.numContributorsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numContributorsMin" ) ) {
        conditions[ "numContributors" ].$lte = filtrationCriteria.numContributorsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numDeliveryFeesMin" ) ) {
        conditions[ "numDeliveryFees" ].$gte = filtrationCriteria.numDeliveryFeesMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numDeliveryFeesMax" ) ) {
        conditions[ "numDeliveryFees" ].$lte = filtrationCriteria.numDeliveryFeesMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "totalDeliveryFeesMin" ) ) {
        conditions[ "totalDeliveryFees" ].$gte = filtrationCriteria.totalDeliveryFeesMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "totalDeliveryFeesMax" ) ) {
        conditions[ "totalDeliveryFees" ].$lte = filtrationCriteria.totalDeliveryFeesMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numTracksMin" ) ) {
        conditions[ "numTracks" ].$gte = filtrationCriteria.numTracksMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numTracksMax" ) ) {
        conditions[ "numTracks" ].$lte = filtrationCriteria.numTracksMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "totalValueCartProductsMin" ) ) {
        conditions[ "totalValueCartProducts" ].$gte = filtrationCriteria.totalValueCartProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "totalValueCartProductsMax" ) ) {
        conditions[ "totalValueCartProducts" ].$lte = filtrationCriteria.totalValueCartProductsMax;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.round.SortCriteria ) : Promise<any> => {

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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.round.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      if ( details.roundName ) {
        updateDetails.roundName = details.roundName;
      }

      if ( details.inProgress ) {
        updateDetails.inProgress = details.inProgress;
      }

      if ( details.duration ) {
        if ( details.duration.start || details.duration.end || details.duration.span ) {
          updateDetails.duration = {};
          if ( details.duration.start ) {
            updateDetails.duration.start = details.duration.start;
          }
          if ( details.duration.end ) {
            updateDetails.duration.end = details.duration.end;
          }
          if ( details.duration.span ) {
            updateDetails.duration.span = details.duration.span;
          }
        }
      }

      if ( details.deliveryFee ) {
        updateDetails.deliveryFee = details.deliveryFee;
      }

      if ( details.numContributions ) {
        updateDetails.numContributions = details.numContributions;
      }

      if ( details.totalValueContributions ) {
        updateDetails.totalValueContributions = details.totalValueContributions;
      }

      if ( details.numContributors ) {
        updateDetails.numContributors = details.numContributors;
      }

      if ( details.numDeliveryFees ) {
        updateDetails.numDeliveryFees = details.numDeliveryFees;
      }

      if ( details.totalDeliveryFees ) {
        updateDetails.totalDeliveryFees = details.totalDeliveryFees;
      }

      if ( details.numTracks ) {
        updateDetails.numTracks = details.numTracks;
      }

      if ( details.totalValueCartProducts ) {
        updateDetails.totalValueCartProducts = details.totalValueCartProducts;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageRound => {

  return new MongoStorageRound( emitterFactory( emitEvent ) , RoundMongooseModel , mapDetails );

}

/******************************************************************************/
