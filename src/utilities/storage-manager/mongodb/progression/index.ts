/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { ProgressionModel , ProgressionMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageProgression extends MongoController implements interfaces.utilities.storageManager.StorageProgression {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.progression.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.progression.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.progression.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundProgressions : interfaces.dataModel.Progression[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundProgressions.length
          } );

          resolve();

        } );

        return Promise.resolve( foundProgressions );

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

  readonly getById = ( progressionId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( progressionId );

      } )
      .then( ( foundProgression : interfaces.dataModel.Progression ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : progressionId
          } );

        } );

        return Promise.resolve( foundProgression );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : progressionId ,
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

  readonly addBatch = ( progressions : interfaces.utilities.storageManager.progression.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( progressions.map( ( progression ) => {

          return {
            userId : progression.userId ,
            subject : progression.subject ,
            timeMeasure : progression.timeMeasure
          };

        } ) );

      } )
      .then( ( progressions : interfaces.dataModel.Progression[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          progressions.forEach( ( progression : interfaces.dataModel.Progression ) => {

            this.emitter.added( {
              document : progression
            } );

          } );

          resolve();

        } );

        return Promise.resolve( progressions );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : progressions ,
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

  readonly add = ( userId : mongoose.Types.ObjectId , subject : interfaces.dataModel.ProgressionSubject , timeMeasure : interfaces.dataModel.ProgressionTimeMeasure , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        subejct : subject ,
        timeMeasure : timeMeasure
      } );

    } )
    .then( ( progression : ProgressionModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : progression
        } );

      } );

      return Promise.resolve( progression );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            subejct : subject ,
            timeMeasure : timeMeasure
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.progression.FiltrationCriteria , details : interfaces.utilities.storageManager.progression.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Progression[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Progression ) => {

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

  readonly updateById = ( progressionId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.progression.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : progressionId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Progression[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Progression ) => {

            this.emitter.updated( {
              id : progressionId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : progressionId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.progression.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( progressionId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : progressionId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : progressionId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : progressionId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.progression.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "subject" ) ) {
        conditions[ "subject" ] = filtrationCriteria.subject;
      }

      if ( filtrationCriteria.hasOwnProperty( "timeMeasure" ) ) {
        conditions[ "timeMeasure.identifier" ] = filtrationCriteria.timeMeasure;
      }

      if ( filtrationCriteria.hasOwnProperty( "additionsMin" ) || filtrationCriteria.hasOwnProperty( "additionsMax" ) ) {
        conditions[ "amounts.additions" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "additionsMin" ) ) {
        conditions[ "amounts.additions" ].$gte = filtrationCriteria.additionsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "additionsMax" ) ) {
        conditions[ "amounts.additions" ].$lte = filtrationCriteria.additionsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "subtractionsMin" ) || filtrationCriteria.hasOwnProperty( "subtractionsMax" ) ) {
        conditions[ "amounts.subtractions" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "subtractionsMin" ) ) {
        conditions[ "amounts.subtractions" ].$gte = filtrationCriteria.subtractionsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "subtractionsMax" ) ) {
        conditions[ "amounts.subtractions" ].$lte = filtrationCriteria.subtractionsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "endAmountMin" ) || filtrationCriteria.hasOwnProperty( "endAmountMax" ) ) {
        conditions[ "amounts.endAmount" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "endAmountMin" ) ) {
        conditions[ "amounts.endAmount" ].$gte = filtrationCriteria.endAmountMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "endAmountMax" ) ) {
        conditions[ "amounts.endAmount" ].$lte = filtrationCriteria.endAmountMax;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.progression.SortCriteria ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      let sortString : string;
      let criteria : string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      if ( sortCriteria.criteria == "additions" ) {
        criteria = "amounts.additions";
      } else if ( sortCriteria.criteria == "subtractions" ) {
        criteria = "amounts.subtractions";
      } else if ( sortCriteria.criteria == "endAmount" ) {
        criteria = "amounts.endAmount";
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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.progression.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.subject ) {
        updateDetails.subject = details.subject;
      }

      if ( details.timeMeasure ) {
        if ( details.timeMeasure.identifier || details.timeMeasure.label ) {
          updateDetails.timeMeasure = {};
          if ( details.timeMeasure.identifier ) {
            updateDetails.timeMeasure.identifier = details.timeMeasure.identifier;
          }
          if ( details.timeMeasure.label ) {
            updateDetails.timeMeasure.label = details.timeMeasure.label;
          }
        }
      }

      if ( details.amounts ) {
        if ( details.amounts.additions || details.amounts.subtractions || details.amounts.endAmount ) {
          updateDetails.amounts = {};
          if ( details.amounts.additions ) {
            updateDetails.amounts.additions = details.amounts.additions;
          }
          if ( details.amounts.subtractions ) {
            updateDetails.amounts.subtractions = details.amounts.subtractions;
          }
          if ( details.amounts.endAmount ) {
            updateDetails.amounts.endAmount = details.amounts.endAmount;
          }
        }
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageProgression => {

  return new MongoStorageProgression( emitterFactory( emitEvent ) , ProgressionMongooseModel , mapDetails );

}

/******************************************************************************/
