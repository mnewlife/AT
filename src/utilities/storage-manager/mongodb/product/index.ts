/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

import * as events from "../../../../interfaces/events/utilities/storage-manager/product/index";
import * as getParams from "../../../../interfaces/data-model/get-params/product/index";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager/index";
import * as productInterfaces from "../../../../interfaces/utilities/storage-manager/product/index";

import * as dataStructuresInterfaces from "../../../../interfaces/utilities/shared-logic/data-structures/index";

import MongoController from "../mongo-controller/index";
import { ProductModel, ProductMongooseModel } from "./model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoStorageProduct extends MongoController implements storageManagerInterfaces.StorageProduct {

  /*****************************************************************/

  constructor( protected readonly emitter: productInterfaces.Emitter, protected readonly Model: mongoose.Model<mongoose.Document>, mapDetails: dataStructuresInterfaces.MapDetails ) {
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
      .then(( foundProducts: interfaces.dataModel.Product[] ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            numDocuments: foundProducts.length
          } );

          resolve();

        } );

        return Promise.resolve( foundProducts );

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

  readonly getById = ( productIdString: string, forceThrow = false ): Promise<any> => {

    let productId : mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        productId = mongoose.Types.ObjectId( productIdString );

        return this.findById( productId );

      } )
      .then(( foundProduct: interfaces.dataModel.Product ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.gotById( {
            id: productId
          } );

        } );

        return Promise.resolve( foundProduct );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.getByIdFailed( {
            id: productId,
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

  readonly addBatch = ( products: productInterfaces.AddBatchParams[], forceThrow = false ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMulitpleDocuments( products.map(( product ) => {

          return {
            label: product.label,
            images: ( product.images ) ? product.images : [],
            priceValues: {
              min: {},
              max: {},
              median: {},
              mean: {}
            },
            effectivePrice: {}
          };

        } ) );

      } )
      .then(( products: interfaces.dataModel.Product[] ) => {

        new Promise<any>(( resolve, reject ) => {

          products.forEach(( product: interfaces.dataModel.Product ) => {

            this.emitter.added( {
              document: product
            } );

          } );

          resolve();

        } );

        return Promise.resolve( products );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: products,
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

  readonly add = ( label: string, images?: string[], forceThrow?: boolean ): Promise<any> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( {
          label: label,
          images: ( images ) ? images : [],
          priceValues: {
            min: {},
            max: {},
            median: {},
            mean: {}
          },
          effectivePrice: {}
        } );

      } )
      .then(( product: ProductModel ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.added( {
            document: product
          } );

        } );

        return Promise.resolve( product );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.addFailed( {
            details: {
              label: label,
              images: ( images ) ? images : [],
              priceValues: {
                min: {},
                max: {},
                median: {},
                mean: {}
              },
              effectivePrice: {}
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

  readonly update = ( filtrationCriteria: getParams.FiltrationCriteria, details: productInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

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
      .then(( updatedDocuments: interfaces.dataModel.Product[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Product ) => {

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

  readonly updateById = ( productIdString: string, details: productInterfaces.UpdateDetails, forceThrow = false ): Promise<any> => {

    let params: any = {
      conditions: ""
    };

    let productId : mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        productId = mongoose.Types.ObjectId( productIdString );

        params.conditions = {
          "_id": productId
        };

        return this.generateUpdateDetails( details );

      } )
      .then(( details: any ) => {

        return this.updateDocuments( params.conditions, details );

      } )
      .then(( updatedDocuments: interfaces.dataModel.Product[] ) => {

        new Promise<any>(( resolve, reject ) => {

          updatedDocuments.forEach(( document: interfaces.dataModel.Product ) => {

            this.emitter.updated( {
              id: productId,
              document: document
            } );

          } );

        } );

        return Promise.resolve( updatedDocuments[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.updateFailed( {
            id: productId,
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

  readonly removeById = ( productIdString: string, forceThrow?: boolean ): Promise<any> => {

    let productId : mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let productId = mongoose.Types.ObjectId( productIdString );

        return this.removeDocuments( {
          "_id": productId
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removed( {
            id: productId
          } );

        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {

          this.emitter.removeFailed( {
            id: productId,
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

      if ( filtrationCriteria.hasOwnProperty( "label" ) ) {
        conditions[ "label" ] = filtrationCriteria.label;
      }

      if ( filtrationCriteria.hasOwnProperty( "images" ) ) {
        conditions[ "images" ] = filtrationCriteria.images;
      }

      if ( filtrationCriteria.hasOwnProperty( "effectivePriceMin" ) || filtrationCriteria.hasOwnProperty( "effectivePriceMax" ) ) {
        conditions[ "effectivePrice.price" ] = {};
      }
      if ( filtrationCriteria.hasOwnProperty( "effectivePriceMin" ) ) {
        conditions[ "effectivePrice.price" ].$gte = filtrationCriteria.effectivePriceMin;
      }
      if ( filtrationCriteria.hasOwnProperty( "effectivePriceMax" ) ) {
        conditions[ "effectivePrice.price" ].$lte = filtrationCriteria.effectivePriceMax;
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

      if ( sortCriteria.criteria == "effectivePrice" ) {
        criteria = "effectivePrice.price";
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

  private readonly generateUpdateDetails = ( details: productInterfaces.UpdateDetails ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      if ( !details ) {
        resolve( "" );
      }

      let updateDetails: any = {};

      if ( details.label ) {
        updateDetails.emailAddress = details.label;
      }

      if ( details.images ) {
        updateDetails.images = details.images;
      }

      if ( details.priceValues ) {
        updateDetails.priceValues = details.priceValues;
      }

      if ( details.effectivePrice ) {
        updateDetails.effectivePrice = details.effectivePrice;
      }

      resolve( updateDetails );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( emitEvent: interfaces.setupConfig.eventManager.Emit, mapDetails: dataStructuresInterfaces.MapDetails ): storageManagerInterfaces.StorageProduct => {

  return new MongoStorageProduct( emitterFactory( emitEvent ), ProductMongooseModel, mapDetails );

}

/******************************************************************************/
