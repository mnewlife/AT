/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { ContributionModel , ContributionMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageContribution extends MongoController implements interfaces.utilities.storageManager.StorageContribution {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.contribution.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.contribution.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.contribution.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundContributions : interfaces.dataModel.Contribution[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundContributions.length
          } );

          resolve();

        } );

        return Promise.resolve( foundContributions );

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

  readonly getById = ( contributionId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( contributionId );

      } )
      .then( ( foundContribution : interfaces.dataModel.Contribution ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : contributionId
          } );

        } );

        return Promise.resolve( foundContribution );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : contributionId ,
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

  readonly addBatch = ( contributions : interfaces.utilities.storageManager.contribution.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( contributions.map( ( contribution ) => {

          return {
            userId : contribution.userId ,
            roundId : contribution.roundId ,
            payment : contribution.payment
          };

        } ) );

      } )
      .then( ( contributions : interfaces.dataModel.Contribution[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          contributions.forEach( ( contribution : interfaces.dataModel.Contribution ) => {

            this.emitter.added( {
              document : contribution
            } );

          } );

          resolve();

        } );

        return Promise.resolve( contributions );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : contributions ,
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

  readonly add = ( userId : mongoose.Types.ObjectId , roundId : mongoose.Types.ObjectId , payment : interfaces.dataModel.ContributionPaymentDetails , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        roundId : roundId ,
        payment : payment
      } );

    } )
    .then( ( contribution : ContributionModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : contribution
        } );

      } );

      return Promise.resolve( contribution );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            roundId : roundId ,
            payment : payment
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.contribution.FiltrationCriteria , details : interfaces.utilities.storageManager.contribution.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Contribution[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Contribution ) => {

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

  readonly updateById = ( contributionId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.contribution.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : contributionId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Contribution[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Contribution ) => {

            this.emitter.updated( {
              id : contributionId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : contributionId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.contribution.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( contributionId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : contributionId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : contributionId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : contributionId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.contribution.FiltrationCriteria ) : Promise<any> => {

    let conditions : any = {};

    return new Promise<any>( ( resolve , reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "userId" ) ) {
        conditions[ "userId" ] = filtrationCriteria.userId;
      }

      if ( filtrationCriteria.hasOwnProperty( "roundId" ) ) {
        conditions[ "roundId" ] = filtrationCriteria.roundId;
      }

      if ( filtrationCriteria.hasOwnProperty( "paymentIdentifier" ) ) {
        conditions[ "paymentIdentifier" ] = filtrationCriteria.paymentIdentifier;
      }

      if ( filtrationCriteria.hasOwnProperty( "paymentAmountMin" ) || filtrationCriteria.hasOwnProperty( "paymentAmountMax" ) ) {
        conditions[ "payment.amount" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "paymentAmountMin" ) ) {
        conditions[ "payment.amount" ].$gte = filtrationCriteria.paymentAmountMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "paymentAmountMax" ) ) {
        conditions[ "payment.amount" ].$lte = filtrationCriteria.paymentAmountMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "paymentMethod" ) ) {
        conditions[ "paymentMethod" ] = filtrationCriteria.paymentMethod;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.contribution.SortCriteria ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      let sortString : string;
      let criteria : string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      if ( sortCriteria.criteria == "paymentAmount" ) {
        criteria = "payment.amount";
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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.contribution.UpdateDetails ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails : any = {};

      if ( details.userId ) {
        updateDetails.userId = details.userId;
      }

      if ( details.roundId ) {
        updateDetails.roundId = details.roundId;
      }

      if ( details.payment ) {
        if ( details.payment.identifier || details.payment.amount || details.payment.method ) {
          updateDetails.payment = {};
          if ( details.payment.identifier ) {
            updateDetails.payment.identifier = details.payment.identifier;
          }
          if ( details.payment.amount ) {
            updateDetails.payment.amount = details.payment.amount;
          }
          if ( details.payment.method ) {
            updateDetails.payment.method = details.payment.method;
          }
        }
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageContribution => {

  return new MongoStorageContribution( emitterFactory( emitEvent ) , ContributionMongooseModel , mapDetails );

}

/******************************************************************************/
