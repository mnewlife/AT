/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { CartModel , CartMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageCart extends MongoController implements interfaces.utilities.storageManager.StorageCart {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.cart.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.cart.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.cart.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundCarts : interfaces.dataModel.Cart[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundCarts.length
          } );

          resolve();

        } );

        return Promise.resolve( foundCarts );

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

  readonly getById = ( cartId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( cartId );

      } )
      .then( ( foundCart : interfaces.dataModel.Cart ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : cartId
          } );

        } );

        return Promise.resolve( foundCart );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : cartId ,
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

  readonly addBatch = ( carts : interfaces.utilities.storageManager.cart.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( carts.map( ( cart ) => {

          return {
            userId : cart.userId ,
            roundId : cart.roundId ,
            adminFeePercentage : cart.adminFeePercentage ,
            numProducts : cart.numProducts ,
            costProducts : cart.costProducts
          };

        } ) );

      } )
      .then( ( carts : interfaces.dataModel.Cart[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          carts.forEach( ( cart : interfaces.dataModel.Cart ) => {

            this.emitter.added( {
              document : cart
            } );

          } );

          resolve();

        } );

        return Promise.resolve( carts );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : carts ,
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

  readonly add = ( userId : mongoose.Types.ObjectId , roundId : mongoose.Types.ObjectId , adminFeePercentage : number , numProducts? : number , costProducts? : number , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        roundId : roundId ,
        adminFeePercentage : adminFeePercentage ,
        numProducts : numProducts ,
        costProducts : costProducts
      } );

    } )
    .then( ( cart : CartModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : cart
        } );

      } );

      return Promise.resolve( cart );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            roundId : roundId ,
            adminFeePercentage : adminFeePercentage ,
            numProducts : numProducts ,
            costProducts : costProducts
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.cart.FiltrationCriteria , details : interfaces.utilities.storageManager.cart.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.Cart[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Cart ) => {

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

  readonly updateById = ( cartId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.cart.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : cartId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.Cart[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.Cart ) => {

            this.emitter.updated( {
              id : cartId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : cartId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.cart.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( cartId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : cartId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : cartId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : cartId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.cart.FiltrationCriteria ) : Promise<any> => {

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

      if ( filtrationCriteria.hasOwnProperty( "adminFeePercentageMin" ) || filtrationCriteria.hasOwnProperty( "adminFeePercentageMax" ) ) {
        conditions[ "adminFeePercentage" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "adminFeePercentageMin" ) ) {
        conditions[ "adminFeePercentage" ].$gte = filtrationCriteria.adminFeePercentageMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "adminFeePercentageMax" ) ) {
        conditions[ "adminFeePercentage" ].$lte = filtrationCriteria.adminFeePercentageMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "numProductsMin" ) || filtrationCriteria.hasOwnProperty( "numProductsMax" ) ) {
        conditions[ "numProducts" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "numProductsMin" ) ) {
        conditions[ "numProducts" ].$gte = filtrationCriteria.numProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "numProductsMax" ) ) {
        conditions[ "numProducts" ].$lte = filtrationCriteria.numProductsMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "costProductsMin" ) || filtrationCriteria.hasOwnProperty( "costProductsMin" ) ) {
        conditions[ "costProducts" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "costProductsMin" ) ) {
        conditions[ "costProducts" ].$gte = filtrationCriteria.costProductsMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "costProductsMax" ) ) {
        conditions[ "costProducts" ].$lte = filtrationCriteria.costProductsMax;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.cart.SortCriteria ) : Promise<any> => {

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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.cart.UpdateDetails ) : Promise<any> => {

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

      if ( details.adminFeePercentage ) {
        updateDetails.adminFeePercentage = details.adminFeePercentage;
      }

      if ( details.numProducts ) {
        updateDetails.numProducts = details.numProducts;
      }

      if ( details.costProducts ) {
        updateDetails.costProducts = details.costProducts;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageCart => {

  return new MongoStorageCart( emitterFactory( emitEvent ) , CartMongooseModel , mapDetails );

}

/******************************************************************************/
