/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, ProductMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoProduct extends MongoController implements storageManagerInterfaces.grocRound.Product {

  /*****************************************************************/

  protected readonly emitter: storageManagerInterfaces.grocRound.product.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageManagerInterfaces.grocRound.product.Emitter;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      emitter: params.emitter,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundProducts: Model[] ) => {

        return this.convertToAbstract( foundProducts );

      } )
      .then(( convertedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<interfaces.dataModel.grocRound.product.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedProducts.map(( product ) => {
              return product.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedProducts );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
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

  readonly getById = ( productId: string, forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( productId ) );

      } )
      .then(( foundProduct: Model ) => {

        return this.convertToAbstract( [ foundProduct ] );

      } )
      .then(( convertedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: productId
          } );
        } );

        return Promise.resolve( convertedProducts[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: productId,
            reason: reason
          } );
          resolve();
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

  readonly addBatch = ( products: storageManagerInterfaces.grocRound.product.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( products.map(( product ) => {
          let productDetails: Model_Partial = {
            label: product.label,
            priceValues: {},
            effectivePrice: {
              price: product.effectivePrice.price
            }
          };
          if ( product.effectivePrice.shopId ) {
            productDetails.effectivePrice.shopId = mongoose.Types.ObjectId( product.effectivePrice.shopId );
          }
          if ( product.images ) {
            productDetails.images = product.images;
          }
          if ( product.priceValues.min ) {
            productDetails.priceValues.min = {
              shopId: mongoose.Types.ObjectId( product.priceValues.min.shopId ),
              price: product.priceValues.min.price
            };
          }
          if ( product.priceValues.max ) {
            productDetails.priceValues.max = {
              shopId: mongoose.Types.ObjectId( product.priceValues.max.shopId ),
              price: product.priceValues.max.price
            };
          }
          if ( product.priceValues.median ) {
            productDetails.priceValues.median = {
              shopId: mongoose.Types.ObjectId( product.priceValues.median.shopId ),
              price: product.priceValues.median.price
            };
          }
          if ( product.priceValues.mean ) {
            productDetails.priceValues.mean = {
              shopId: mongoose.Types.ObjectId( product.priceValues.mean.shopId ),
              price: product.priceValues.mean.price
            };
          }

          return productDetails;
        } ) );

      } )
      .then(( addedProducts: Model[] ) => {

        return this.convertToAbstract( addedProducts );

      } )
      .then(( convertedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedProducts
          } );
          resolve();
        } );

        return Promise.resolve( convertedProducts );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: products,
            reason: reason
          } );
          resolve();
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

  readonly add = ( details: storageManagerInterfaces.grocRound.product.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let productDetails: Model_Partial = {
          label: details.label,
          priceValues: {
            createdAt: new Date(),
            updatedAt: new Date()
          },
          effectivePrice: {
            price: details.effectivePrice.price
          }
        };
        if ( details.effectivePrice.shopId ) {
          productDetails.effectivePrice.shopId = mongoose.Types.ObjectId( details.effectivePrice.shopId );
        }
        if ( details.images ) {
          productDetails.images = details.images;
        }
        if ( details.priceValues.min ) {
          productDetails.priceValues.min = {
            shopId: mongoose.Types.ObjectId( details.priceValues.min.shopId ),
            price: details.priceValues.min.price
          };
        }
        if ( details.priceValues.max ) {
          productDetails.priceValues.max = {
            shopId: mongoose.Types.ObjectId( details.priceValues.max.shopId ),
            price: details.priceValues.max.price
          };
        }
        if ( details.priceValues.median ) {
          productDetails.priceValues.median = {
            shopId: mongoose.Types.ObjectId( details.priceValues.median.shopId ),
            price: details.priceValues.median.price
          };
        }
        if ( details.priceValues.mean ) {
          productDetails.priceValues.mean = {
            shopId: mongoose.Types.ObjectId( details.priceValues.mean.shopId ),
            price: details.priceValues.mean.price
          };
        }

        return this.saveDocument( productDetails );

      } )
      .then(( addedProduct: Model ) => {

        return this.convertToAbstract( [ addedProduct ] );

      } )
      .then(( convertedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedProducts
          } );
          resolve();
        } );

        return Promise.resolve( convertedProducts[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
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

  readonly update = ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria, details: storageManagerInterfaces.grocRound.product.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundProducts: Model[] ) => {

        return Promise.all( foundProducts.map(( product ) => {

          return this.generateUpdateDetails( product, details )
            .then(( fedProduct: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedProduct.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedProduct );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedProducts: Model[] ) => {

        return this.convertToAbstract( updatedProducts );

      } )
      .then(( updatedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedProducts
          } );
          resolve();
        } );

        return Promise.resolve( updatedProducts );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
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

  readonly updateById = ( productId: string, details: storageManagerInterfaces.grocRound.product.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super> => {

    let productObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( productId ) );

      } )
      .then(( product: Model ) => {

        return this.generateUpdateDetails( product, details )
          .then(( fedProduct: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedProduct.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedProduct );
                }
              } );
            } );

          } );

      } )
      .then(( updatedProduct: Model ) => {

        return this.convertToAbstract( [ updatedProduct ] );

      } )
      .then(( convertedProducts: interfaces.dataModel.grocRound.product.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: productId,
            documents: convertedProducts
          } );
          resolve();
        } );

        return Promise.resolve( convertedProducts[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: productId,
            updates: details,
            reason: reason
          } );
          resolve();
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

  readonly remove = ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
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

  readonly removeById = ( productId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( productId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: productId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: productId,
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

  private readonly makeConditions = ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.label ) {
        conditions[ "label" ] = filtrationCriteria.label;
      }

      if ( filtrationCriteria.images ) {
        conditions[ "images" ] = { $all: filtrationCriteria.images };
      }

      if ( filtrationCriteria.priceValues ) {

        if ( filtrationCriteria.priceValues.min ) {
          if ( filtrationCriteria.priceValues.min.shopId ) {
            conditions[ "priceValues.min.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.min.shopId );
          }
          if ( filtrationCriteria.priceValues.min.price ) {
            conditions[ "priceValues.min.price" ] = {};
            if ( filtrationCriteria.priceValues.min.price.min ) {
              conditions[ "priceValues.min.price" ].$gte = filtrationCriteria.priceValues.min.price.min;
            }
            if ( filtrationCriteria.priceValues.min.price.max ) {
              conditions[ "priceValues.min.price" ].$lte = filtrationCriteria.priceValues.min.price.max;
            }
          }
        }

        if ( filtrationCriteria.priceValues.max ) {
          if ( filtrationCriteria.priceValues.max.shopId ) {
            conditions[ "priceValues.max.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.max.shopId );
          }
          if ( filtrationCriteria.priceValues.max.price ) {
            conditions[ "priceValues.max.price" ] = {};
            if ( filtrationCriteria.priceValues.max.price.min ) {
              conditions[ "priceValues.max.price" ].$gte = filtrationCriteria.priceValues.max.price.min;
            }
            if ( filtrationCriteria.priceValues.max.price.max ) {
              conditions[ "priceValues.max.price" ].$lte = filtrationCriteria.priceValues.max.price.max;
            }
          }
        }

        if ( filtrationCriteria.priceValues.median ) {
          if ( filtrationCriteria.priceValues.median.shopId ) {
            conditions[ "priceValues.median.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.median.shopId );
          }
          if ( filtrationCriteria.priceValues.median.price ) {
            conditions[ "priceValues.median.price" ] = {};
            if ( filtrationCriteria.priceValues.median.price.min ) {
              conditions[ "priceValues.median.price" ].$gte = filtrationCriteria.priceValues.median.price.min;
            }
            if ( filtrationCriteria.priceValues.median.price.max ) {
              conditions[ "priceValues.median.price" ].$lte = filtrationCriteria.priceValues.median.price.max;
            }
          }
        }

        if ( filtrationCriteria.priceValues.mean ) {
          if ( filtrationCriteria.priceValues.mean.shopId ) {
            conditions[ "priceValues.mean.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.priceValues.mean.shopId );
          }
          if ( filtrationCriteria.priceValues.mean.price ) {
            conditions[ "priceValues.mean.price" ] = {};
            if ( filtrationCriteria.priceValues.mean.price.min ) {
              conditions[ "priceValues.mean.price" ].$gte = filtrationCriteria.priceValues.mean.price.min;
            }
            if ( filtrationCriteria.priceValues.mean.price.max ) {
              conditions[ "priceValues.mean.price" ].$lte = filtrationCriteria.priceValues.mean.price.max;
            }
          }
        }

      }

      if ( filtrationCriteria.effectivePrice ) {
        if ( filtrationCriteria.effectivePrice.shopId ) {
          conditions[ "effectivePrice.shopId" ] = mongoose.Types.ObjectId( filtrationCriteria.effectivePrice.shopId );
        }
        if ( filtrationCriteria.effectivePrice.price ) {
          conditions[ "effectivePrice.price" ] = {};
          if ( filtrationCriteria.effectivePrice.price.min ) {
            conditions[ "effectivePrice.price" ].$gte = filtrationCriteria.effectivePrice.price.min;
          }
          if ( filtrationCriteria.effectivePrice.price.max ) {
            conditions[ "effectivePrice.price" ].$lte = filtrationCriteria.effectivePrice.price.max;
          }
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageManagerInterfaces.grocRound.product.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      if ( sortCriteria.criteria === "effectivePrice" ) {
        sortString = "effectivePrice.price";
      } else {
        sortString = sortCriteria.criteria;
      }
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageManagerInterfaces.grocRound.product.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.label ) {
        document.label = details.label;
      }

      if ( details.imagesToAdd ) {
        details.imagesToAdd.forEach(( image ) => {
          document.images.push( image );
        } );
      }

      if ( details.imagesToRemove ) {
        details.imagesToRemove.forEach(( image ) => {
          let index = document.images.indexOf( image );
          if ( index && index != -1 ) {
            document.images.splice( index, 1 );
          }
        } );
      }

      if ( details.priceValues ) {
        if ( details.priceValues.min ) {
          document.priceValues.min.shopId = mongoose.Types.ObjectId( details.priceValues.min.shopId );
          document.priceValues.min.price = details.priceValues.min.price;
          document.priceValues.min.updatedAt = new Date();
        }
        if ( details.priceValues.max ) {
          document.priceValues.max.shopId = mongoose.Types.ObjectId( details.priceValues.max.shopId );
          document.priceValues.max.price = details.priceValues.max.price;
          document.priceValues.max.updatedAt = new Date();
        }
        if ( details.priceValues.median ) {
          document.priceValues.median.shopId = mongoose.Types.ObjectId( details.priceValues.median.shopId );
          document.priceValues.median.price = details.priceValues.median.price;
          document.priceValues.median.updatedAt = new Date();
        }
        if ( details.priceValues.mean ) {
          document.priceValues.mean.shopId = mongoose.Types.ObjectId( details.priceValues.mean.shopId );
          document.priceValues.mean.price = details.priceValues.mean.price;
          document.priceValues.mean.updatedAt = new Date();
        }
      }

      if ( details.effectivePrice ) {
        document.effectivePrice.shopId = mongoose.Types.ObjectId( details.effectivePrice.shopId ),
          document.effectivePrice.price = details.effectivePrice.price;
        document.effectivePrice.updatedAt = new Date();
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( products: Model[], forceThrow = false ): Promise<interfaces.dataModel.grocRound.product.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.grocRound.product.Super[]>(( resolve, reject ) => {

          let returnProducts: interfaces.dataModel.grocRound.product.Super[] = [];

          products.forEach(( product ) => {

            let returnProduct: interfaces.dataModel.grocRound.product.Super = {
              id: ( <mongoose.Types.ObjectId>product._id ).toHexString(),
              label: product.label,
              priceValues: {
                id: ( <mongoose.Types.ObjectId>product.priceValues._id ).toHexString(),
                createdAt: product.priceValues.createdAt,
                updatedAt: product.priceValues.updatedAt
              },
              effectivePrice: {
                id: ( <mongoose.Types.ObjectId>product.effectivePrice._id ).toHexString(),
                price: product.effectivePrice.price,
                createdAt: product.effectivePrice.createdAt,
                updatedAt: product.effectivePrice.updatedAt                
              },
              createdAt: product.createdAt,
              updatedAt: product.updatedAt
            };

            if ( product.effectivePrice.shopId ) {
              returnProduct.effectivePrice.shopId = ( product.effectivePrice.shopId as mongoose.Types.ObjectId ).toHexString();
            }
            if ( product.images ) {
              returnProduct.images = product.images;
            }
            if ( product.priceValues.min ) {
              returnProduct.priceValues.min = {
                id: ( product.priceValues.min._id as mongoose.Types.ObjectId ).toHexString(),
                shopId: ( product.priceValues.min.shopId as mongoose.Types.ObjectId ).toHexString(),
                price: product.priceValues.min.price,
                createdAt: product.priceValues.min.createdAt,
                updatedAt: product.priceValues.min.updatedAt
              };
            }
            if ( product.priceValues.max ) {
              returnProduct.priceValues.max = {
                id: ( product.priceValues.max._id as mongoose.Types.ObjectId ).toHexString(),
                shopId: ( product.priceValues.max.shopId as mongoose.Types.ObjectId ).toHexString(),
                price: product.priceValues.max.price,
                createdAt: product.priceValues.max.createdAt,
                updatedAt: product.priceValues.max.updatedAt
              };
            }
            if ( product.priceValues.median ) {
              returnProduct.priceValues.median = {
                id: ( product.priceValues.median._id as mongoose.Types.ObjectId ).toHexString(),
                shopId: ( product.priceValues.median.shopId as mongoose.Types.ObjectId ).toHexString(),
                price: product.priceValues.median.price,
                createdAt: product.priceValues.median.createdAt,
                updatedAt: product.priceValues.median.updatedAt
              };
            }
            if ( product.priceValues.mean ) {
              returnProduct.priceValues.mean = {
                id: ( product.priceValues.mean._id as mongoose.Types.ObjectId ).toHexString(),
                shopId: ( product.priceValues.mean.shopId as mongoose.Types.ObjectId ).toHexString(),
                price: product.priceValues.mean.price,
                createdAt: product.priceValues.mean.createdAt,
                updatedAt: product.priceValues.mean.updatedAt
              };
            }

            returnProducts.push( returnProduct );

          } );

          resolve( returnProducts );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "label"?: string;
  "images"?: { $all: string[] };

  "priceValues.min.shopId"?: mongoose.Types.ObjectId;
  "priceValues.min.price"?: { $gte?: number; $lte?: number; };

  "priceValues.max.shopId"?: mongoose.Types.ObjectId;
  "priceValues.max.price"?: { $gte?: number; $lte?: number; };

  "priceValues.median.shopId"?: mongoose.Types.ObjectId;
  "priceValues.median.price"?: { $gte?: number; $lte?: number; };

  "priceValues.mean.shopId"?: mongoose.Types.ObjectId;
  "priceValues.mean.price"?: { $gte?: number; $lte?: number; };

  "effectivePrice.shopId"?: mongoose.Types.ObjectId;
  "effectivePrice.price"?: { $gte?: number; $lte?: number; };

  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageManagerInterfaces.grocRound.Product => {
  return new MongoProduct( {
    emitter: emitterFactory( params.emitEvent ),
    Model: ProductMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
