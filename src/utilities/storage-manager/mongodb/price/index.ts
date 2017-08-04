/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/price/index";
import * as getParams from "../../../../interfaces/data-model/get-params/price/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as priceInterfaces from "../../../../interfaces/utilities/storage-manager/price/index";

import * as dataStructuresInterfaces from "../../../../interfaces/utilities/shared-logic/data-structures/index";

import MongoController from "../mongo-controller/index";
import { PriceModel, PriceMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStoragePrice extends MongoController implements storageManagerInterfaces.StoragePrice {

  /*****************************************************************/

  constructor( protected readonly emitter: priceInterfaces.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: dataStructuresInterfaces.MapDetails ) {
    super( emitter, Model, mapDetails );
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow = false ): Promise<any> => {

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
      .then(( foundPrices: PriceModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundPrices.length
          } );

          resolve();

        } );

        return Promise.resolve( foundPrices );

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

  readonly getById = ( priceIdString: string, forceThrow = false ): Promise<any> => {

    let priceId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        priceId = mongoose.Types.ObjectId( priceIdString );

        return this.findById( priceId );

      } )
      .then(( foundPrice: PriceModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: priceId
          } );

        } );

        return Promise.resolve( foundPrice );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: priceId,
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

  readonly addBatch = ( prices: priceInterfaces.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( prices.map(( price ) => {

          return {
            productId: mongoose.Types.ObjectId( price.productId ),
            shopId: mongoose.Types.ObjectId( price.shopId ),
            quantity: price.quantity,
            price: price.price
          };

        } ) );

      } )
      .then(( prices: PriceModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          prices.forEach(( price: PriceModel ) => {

            this.emitter.added( {
              document: price
            } );

          } );

          resolve();

        } );

        return Promise.resolve( prices );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: prices,
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

  readonly add = ( productIdString: string, shopIdString: string, quantity: number, price: number, forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          productId: mongoose.Types.ObjectId( productIdString ),
          shopId: mongoose.Types.ObjectId( shopIdString ),
          quantity: quantity,
          price: price
        } );

      } )
      .then(( price: PriceModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: price
          } );

        } );

        return Promise.resolve( price );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              productId: mongoose.Types.ObjectId( productIdString ),
              shopId: mongoose.Types.ObjectId( shopIdString ),
              quantity: quantity,
              price: price
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

  readonly update = ( filtrationCriteria: getParams.FiltrationCriteria, details: priceInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

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
      .then(( updatedDocuments: PriceModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: PriceModel ) => {

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

  readonly updateById = ( priceIdString: string, details: priceInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    let priceId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        priceId = mongoose.Types.ObjectId( priceIdString );

        params.conditions = {
          "_id": priceId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: PriceModel[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: PriceModel ) => {

            this.emitter.updated( {
              id: priceId,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: priceId,
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

  readonly remove = ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow = false ): Promise<any> => {

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

  readonly removeById = ( priceIdString: string, forceThrow?: boolean ): Promise<any> => {

    let priceId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        priceId = mongoose.Types.ObjectId( priceIdString );

        return this.removeDocuments( {
          "_id": priceId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: priceId
          } );

        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: priceId,
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

  private readonly makeConditions = ( filtrationCriteria: getParams.FiltrationCriteria ): Promise<any> => {

    let conditions: any = {};

    return new Promise<any>(( resolve, reject ) => {

      if ( !filtrationCriteria ) {
        return resolve( "" );
      }

      if ( filtrationCriteria.hasOwnProperty( "productId" ) ) {
        conditions[ "productId" ] = filtrationCriteria.productId;
      }

      if ( filtrationCriteria.hasOwnProperty( "shopId" ) ) {
        conditions[ "shopId" ] = filtrationCriteria.shopId;
      }

      if ( filtrationCriteria.hasOwnProperty( "quantityMin" ) || filtrationCriteria.hasOwnProperty( "quantityMax" ) ) {
        conditions[ "quantity" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "quantityMin" ) ) {
        conditions[ "quantity" ].$gte = filtrationCriteria.quantityMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "quantityMax" ) ) {
        conditions[ "quantity" ].$lte = filtrationCriteria.quantityMax;
      }

      if ( filtrationCriteria.hasOwnProperty( "priceMin" ) || filtrationCriteria.hasOwnProperty( "priceMax" ) ) {
        conditions[ "price" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "priceMin" ) ) {
        conditions[ "price" ].$gte = filtrationCriteria.priceMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "priceMax" ) ) {
        conditions[ "price" ].$lte = filtrationCriteria.priceMax;
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

  private readonly makeSortCriteria = ( sortCriteria: getParams.SortCriteria ): Promise<any> => {

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

  private readonly generateUpdateDetails = ( details: priceInterfaces.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      if ( details.productId ) {
        updateDetails.productId = details.productId;
      }

      if ( details.shopId ) {
        updateDetails.shopId = details.shopId;
      }

      if ( details.quantity ) {
        updateDetails.quantity = details.quantity;
      }

      if ( details.price ) {
        updateDetails.price = details.price;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: dataStructuresInterfaces.MapDetails ): storageManagerInterfaces.StoragePrice => {

  return new MongoStoragePrice( emitterFactory( emitEvent ), PriceMongooseModel, mapDetails );

}

/******************************************************************************/
