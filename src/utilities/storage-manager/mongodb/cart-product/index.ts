/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import MongoController from "../mongo-controller/index";
import { CartProductModel , CartProductMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageCartProduct extends MongoController implements interfaces.utilities.storageManager.StorageCartProduct {

  /*****************************************************************/

  constructor ( protected readonly emitter : interfaces.utilities.storageManager.cartProduct.Emitter , protected readonly Model : mongoose.Model<mongoose.Document> , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) {
    super( emitter , Model , mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria : interfaces.dataModel.getParams.cartProduct.FiltrationCriteria , sortCriteria : interfaces.dataModel.getParams.cartProduct.SortCriteria , limit : number , forceThrow = false ) : Promise<any> => {

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
      .then( ( foundCartProducts : interfaces.dataModel.CartProduct[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.got( {
            filtrationCriteria : filtrationCriteria ,
            sortCriteria : sortCriteria ,
            limit : limit ,
            numDocuments : foundCartProducts.length
          } );

          resolve();

        } );

        return Promise.resolve( foundCartProducts );

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

  readonly getById = ( cartProductId : mongoose.Types.ObjectId , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.findById( cartProductId );

      } )
      .then( ( foundCartProduct : interfaces.dataModel.CartProduct ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.gotById( {
            id : cartProductId
          } );

        } );

        return Promise.resolve( foundCartProduct );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.getByIdFailed( {
            id : cartProductId ,
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

  readonly addBatch = ( cartProducts : interfaces.utilities.storageManager.cartProduct.AddBatchParams[] , forceThrow = false ) : Promise<any> => {

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        return this.saveMulitpleDocuments( cartProducts.map( ( cartProduct ) => {

          return {
            userId : cartProduct.userId ,
            roundId : cartProduct.roundId ,
            cartId : cartProduct.cartId ,
            product : cartProduct.product
          };

        } ) );

      } )
      .then( ( cartProducts : interfaces.dataModel.CartProduct[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          cartProducts.forEach( ( cartProduct : interfaces.dataModel.CartProduct ) => {

            this.emitter.added( {
              document : cartProduct
            } );

          } );

          resolve();

        } );

        return Promise.resolve( cartProducts );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.addFailed( {
            details : cartProducts ,
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

  readonly add = ( userId : mongoose.Types.ObjectId , roundId : mongoose.Types.ObjectId , cartId : mongoose.Types.ObjectId , product : interfaces.dataModel.CartProductDetails , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.saveDocument( {
        userId : userId ,
        roundId : roundId ,
        cartId : cartId ,
        product : product
      } );

    } )
    .then( ( cartProduct : CartProductModel ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.added( {
          document : cartProduct
        } );

      } );

      return Promise.resolve( cartProduct );

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.addFailed( {
          details : {
            userId : userId ,
            roundId : roundId ,
            cartId : cartId ,
            product : product
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

  readonly update = ( filtrationCriteria : interfaces.dataModel.getParams.cartProduct.FiltrationCriteria , details : interfaces.utilities.storageManager.cartProduct.UpdateDetails , forceThrow = false ) : Promise<any> => {

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
      .then( ( updatedDocuments : interfaces.dataModel.CartProduct[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.CartProduct ) => {

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

  readonly updateById = ( cartProductId : mongoose.Types.ObjectId , details : interfaces.utilities.storageManager.cartProduct.UpdateDetails , forceThrow = false ) : Promise<any> => {

    let params : any = {
      conditions : ""
    };

    return this.checkThrow( forceThrow )
      .then( ( response : any ) => {

        params.conditions = {
          "_id" : cartProductId
        };

        return this.generateUpdateDetails( details );

      } )
      .then( ( details : any ) => {

        return this.updateDocuments( params.conditions , details );

      } )
      .then( ( updatedDocuments : interfaces.dataModel.CartProduct[] ) => {

        new Promise<any>( ( resolve , reject ) => {

          updatedDocuments.forEach( ( document : interfaces.dataModel.CartProduct ) => {

            this.emitter.updated( {
              id : cartProductId ,
              document : document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch( ( reason : any ) => {

        new Promise<any>( ( resolve , reject ) => {

          this.emitter.updateFailed( {
            id : cartProductId ,
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

  readonly remove = ( filtrationCriteria : interfaces.dataModel.getParams.cartProduct.FiltrationCriteria , forceThrow = false ) : Promise<any> => {

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

  readonly removeById = ( cartProductId : mongoose.Types.ObjectId , forceThrow? : boolean ) : Promise<any> => {

    return this.checkThrow( forceThrow )
    .then( ( response : any ) => {

      return this.removeDocuments( {
        "_id" : cartProductId
      } );

    } )
    .then( ( response : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removed( {
          id : cartProductId
        } );

      } );

      return Promise.resolve();

    } )
    .catch( ( reason : any ) => {

      new Promise<any>( ( resolve , reject ) => {

        this.emitter.removeFailed( {
          id : cartProductId ,
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

  private readonly makeConditions = ( filtrationCriteria : interfaces.dataModel.getParams.cartProduct.FiltrationCriteria ) : Promise<any> => {

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

      if ( filtrationCriteria.hasOwnProperty( "cartId" ) ) {
        conditions[ "cartId" ] = filtrationCriteria.cartId;
      }

      if ( filtrationCriteria.hasOwnProperty( "quantityMin" ) || filtrationCriteria.hasOwnProperty( "quantityMax" ) ) {
        conditions[ "product.quantity" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "quantityMin" ) ) {
        conditions[ "product.quantity" ].$gte = filtrationCriteria.quantityMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "quantityMax" ) ) {
        conditions[ "product.quantity" ].$lte = filtrationCriteria.quantityMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "priceMin" ) || filtrationCriteria.hasOwnProperty( "priceMax" ) ) {
        conditions[ "product.price" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "priceMin" ) ) {
        conditions[ "product.price" ].$gte = filtrationCriteria.priceMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "priceMax" ) ) {
        conditions[ "product.price" ].$lte = filtrationCriteria.priceMax;
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

  private readonly makeSortCriteria = ( sortCriteria : interfaces.dataModel.getParams.cartProduct.SortCriteria ) : Promise<any> => {

    return new Promise<any>( ( resolve , reject ) => {

      let sortString : string;
      let criteria : string;

      if ( !sortCriteria ) {
        resolve( "" );
      }

      if ( sortCriteria.criteria == "quantity" ) {
        criteria = "product.quantity";
      } else if ( sortCriteria.criteria == "price" ) {
        criteria = "product.price";
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

  private readonly generateUpdateDetails = ( details : interfaces.utilities.storageManager.cartProduct.UpdateDetails ) : Promise<any> => {

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

      if ( details.cartId ) {
        updateDetails.cartId = details.cartId;
      }

      if ( details.product ) {
        if ( details.product.productId || details.product.quantity || details.product.price ) {
          updateDetails.product = {};
          if ( details.product.productId ) {
            updateDetails.product.productId = details.product.productId;
          }
          if ( details.product.quantity ) {
            updateDetails.product.quantity = details.product.quantity;
          }
          if ( details.product.price ) {
            updateDetails.product.price = details.product.price;
          }
        }
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent : interfaces.setupConfig.eventManager.Emit , mapDetails : interfaces.utilities.sharedLogic.dataStructures.MapDetails ) : interfaces.utilities.storageManager.StorageCartProduct => {

  return new MongoStorageCartProduct( emitterFactory( emitEvent ) , CartProductMongooseModel , mapDetails );

}

/******************************************************************************/
