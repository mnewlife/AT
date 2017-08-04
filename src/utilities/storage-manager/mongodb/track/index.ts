/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { TrackModel , TrackMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageTrack extends MongoController implements interfaces.utilities.storageManager.StorageTrack {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.track.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.track.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundTracks : interfaces.dataModel.Track[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundTracks.length
          } );

          resolve();

        } );

        return Promise.resolve( foundTracks );

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

  readonly getById = ( trackId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( trackId );

      } )
      .then( ( foundTrack : interfaces.dataModel.Track ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : trackId
          } );

        } );

        return Promise.resolve( foundTrack );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : trackId ,
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

  readonly addBatch = ( tracks : interfaces.utilities.storageManager.track.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( tracks.map( ( track ) => {

          return {
            roundId : track.roundId ,
            trackName : track.trackName ,
            contributionValue : track.contributionValue ,
            adminFeePercentage : ( track.adminFeePercentage ) ? track.adminFeePercentage : 0 ,
            installmentValues : ( track.installmentValues ) ? track.installmentValues : []
          };

        } ) );

      } )
      .then( ( tracks : interfaces.dataModel.Track[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          tracks.forEach( ( track : interfaces.dataModel.Track ) => {

            this.emitter.added( {
              document : track
            } );

          } );

          resolve();

        } );

        return Promise.resolve( tracks );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : tracks ,
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

  readonly add = ( roundId : mongoose.Types.ObjectId , trackName : string , contributionValue : number , adminFeePercentage? : number , installmentValues? : interfaces.dataModel.InstallmentValue[] , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        roundId : roundId ,
        trackName : trackName ,
        contributionValue : contributionValue ,
        adminFeePercentage : ( adminFeePercentage ) ? adminFeePercentage : 0 ,
        installmentValues : ( installmentValues ) ? installmentValues : []
      } );

    } )
    .then( ( track : TrackModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : track
        } );

      } );

      return Promise.resolve( track );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            roundId : roundId ,
            trackName : trackName ,
            contributionValue : contributionValue ,
            adminFeePercentage : ( adminFeePercentage ) ? adminFeePercentage : 0 ,
            installmentValues : ( installmentValues ) ? installmentValues : []
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria , details : interfaces.utilities.storageManager.track.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Track[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Track ) => {

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

  readonly updateById = ( trackId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.track.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : trackId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Track[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Track ) => {

            this.emitter.updated( {
              id : trackId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : trackId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( trackId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : trackId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : trackId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : trackId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.track.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "roundId" ) ) {
        conditions[ "roundId" ] = filtrationCriteria.roundId;
      }

      if ( filtrationCriteria.hasOwnProperty( "trackName" ) ) {
        conditions[ "trackName" ] = filtrationCriteria.trackName;
      }

      if ( filtrationCriteria.hasOwnProperty( "contributionValueMin" ) ) {
        conditions[ "contributionValue" ].$gte = filtrationCriteria.contributionValueMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "contributionValueMax" ) ) {
        conditions[ "contributionValue" ].$lte = filtrationCriteria.contributionValueMax;
      }

      let installmentValuesConcerns = [
        "installmentValueValueMin" ,
        "installmentValueValueMax" ,
        "installmentValueIntervalMin" ,
        "installmentValueIntervalMax"
      ];

      let culprits : any[] = installmentValuesConcerns.filter( ( concern : string ) => {
        return ( filtrationCriteria.hasOwnProperty( concern ) );
      } );

      if ( culprits.length ) {
        conditions[ "installmentValues" ] = {};
      }

      if ( filtrationCriteria.hasOwnProperty( "installmentValueValueMin" ) ) {
        conditions[ "installmentValues" ].$all = [ {
          "$elemMatch" : {
            value : { $gte : filtrationCriteria.installmentValueValueMin } ,
          }
        } ];
      }

      if ( filtrationCriteria.hasOwnProperty( "installmentValueValueMax" ) ) {
        conditions[ "installmentValues" ].$all = [ {
          "$elemMatch" : {
            value : { $lte : filtrationCriteria.installmentValueValueMax } ,
          }
        } ];
      }

      if ( filtrationCriteria.hasOwnProperty( "installmentValueIntervalMin" ) ) {
        conditions[ "installmentValues" ].$all = [ {
          "$elemMatch" : {
            value : { $gte : filtrationCriteria.installmentValueIntervalMin } ,
          }
        } ];
      }

      if ( filtrationCriteria.hasOwnProperty( "installmentValueIntervalMax" ) ) {
        conditions[ "installmentValues" ].$all = [ {
          "$elemMatch" : {
            value : { $lte : filtrationCriteria.installmentValueIntervalMax } ,
          }
        } ];
      }

      if ( filtrationCriteria.hasOwnProperty( "adminFeePercentageMin" ) ) {
        conditions[ "adminFeePercentage" ].$gte = filtrationCriteria.adminFeePercentageMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "adminFeePercentageMax" ) ) {
        conditions[ "adminFeePercentage" ].$lte = filtrationCriteria.adminFeePercentageMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numProductsMin" ) ) {
        conditions[ "numProducts" ].$gte = filtrationCriteria.numProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numProductsMax" ) ) {
        conditions[ "numProducts" ].$lte = filtrationCriteria.numProductsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "costProductsMin" ) ) {
        conditions[ "costProducts" ].$gte = filtrationCriteria.costProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "costProductsMax" ) ) {
        conditions[ "costProducts" ].$lte = filtrationCriteria.costProductsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numShopsMin" ) ) {
        conditions[ "numShops" ].$gte = filtrationCriteria.numShopsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numShopsMax" ) ) {
        conditions[ "numShopsMin" ].$lte = filtrationCriteria.numShopsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "shops" ) ) {
        conditions[ "shops" ] = {};
        conditions[ "shops" ].$all = filtrationCriteria.shops;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.track.SortCriteria ) : Promise<any> => {

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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.track.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      let subjects = [
        "roundId" ,
        "trackName" ,
        "contributionValue" ,
        "installmentValues" ,
        "adminFeePercentage" ,
        "numProducts" ,
        "costProducts" ,
        "numShops" ,
        "shops"
      ];

      subjects.forEach( ( subject : string ) => {
        if ( details[ subject ] ) {
          updateDetails[ subject ] = details[ subject ];
        }
      } );

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageTrack => {

  return new MongoStorageTrack( emitterFactory( emitEvent ) , TrackMongooseModel , mapDetails );

}

/******************************************************************************/
