/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageProduct from "../../../../components/storage/interfaces/groc-round/product";

/******************************************************************************/

export default (
  findProducts: storageProduct.Instance[ "get" ],
  findProductById: storageProduct.Instance[ "getById" ],
  createProduct: storageProduct.Instance[ "add" ],
  updateProductById: storageProduct.Instance[ "updateById" ],
  removeProductById: storageProduct.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getProducts", getProducts );
  router.get( "/getProduct/:productId", getProduct );
  router.post( "/addProduct", addProduct );
  router.post( "/updateProduct/:productId", updateProduct );
  router.get( "/deleteProduct/:productId", deleteProduct );

  /*********************************************************/

  function getProducts ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-products";

    return findProducts( null, null, null )
      .then( ( foundProducts: dataModel.grocRound.product.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundProducts: foundProducts,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function getProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-product";

    if ( !req.params.productId ) {
      return sendResponse( res, "grocRound-admin", false, "Product ID is missing", {
        innerContext: innerContext
      } );
    }

    return findProductById( req.params.productId )
      .then( ( foundProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundProduct: foundProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find product", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-product";

    if ( !req.body.label ) {
      return sendResponse( res, "grocRound-admin", false, "Product label is missing", {
        innerContext: innerContext
      } );
    }

    let details: storageProduct.AddDetails = {
      label: req.body.label,
      prices: [],
      priceValues: {
        min: { price: 0 },
        max: { price: 0 },
        median: { price: 0 },
        mean: { price: 0 }
      },
      effectivePrice: { price: 0 }
    };

    if ( req.body.prices ) {
      req.body.prices.forEach( ( price: dataModel.grocRound.product.Price ) => {
        details.prices.push( price );
      } );
    }

    if ( req.body.effectivePrice ) {
      details.effectivePrice.price = req.body.effectivePrice.price;
      if ( req.body.effectivePrice.shopId ) {
        details.effectivePrice.shopId = req.body.effectivePrice.shopId;
      }
    }

    if ( req.body.images ) {
      details.images = [];
      req.body.images.forEach( ( image: string ) => {
        details.images.push( image );
      } );
    }

    return createProduct( details )
      .then( ( createdProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedProduct: createdProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function updateProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-product";

    if ( !req.params.productId ) {
      return sendResponse( res, "grocRound-admin", false, "Product ID is missing", {
        innerContext: innerContext
      } );
    }

    let details: storageProduct.UpdateDetails = {};

    if ( req.body.label ) {
      details.label = req.body.label;
    }

    if ( req.body.images ) {
      details.images = req.body.images;
    }

    if ( req.body.prices ) {
      details.prices = req.body.prices;
    }

    if ( req.body.priceValues ) {

      details.priceValues = {};

      if ( req.body.priceValues.min ) {
        details.priceValues.min = {
          price: req.body.priceValues.min.price
        };
        if ( req.body.priceValues.min.shopId ) {
          details.priceValues.min.shopId = req.body.priceValues.min.shopId;
        }
      }

      if ( req.body.priceValues.max ) {
        details.priceValues.max = {
          price: req.body.priceValues.max.price
        };
        if ( req.body.priceValues.max.shopId ) {
          details.priceValues.max.shopId = req.body.priceValues.max.shopId;
        }
      }

      if ( req.body.priceValues.median ) {
        details.priceValues.median = {
          price: req.body.priceValues.median.price
        };
        if ( req.body.priceValues.median.shopId ) {
          details.priceValues.median.shopId = req.body.priceValues.median.shopId;
        }
      }

      if ( req.body.priceValues.mean ) {
        details.priceValues.mean = {
          price: req.body.priceValues.mean.price
        };
        if ( req.body.priceValues.mean.shopId ) {
          details.priceValues.mean.shopId = req.body.priceValues.mean.shopId;
        }
      }

    }

    if ( req.body.effectivePrice ) {

      details.effectivePrice = {
        price: req.body.effectivePrice.price
      };
      if ( req.body.effectivePrice.shopId ) {
        details.effectivePrice.shopId = req.body.effectivePrice.shopId;
      }

    }

    return updateProductById( req.params.productId, details )
      .then( ( updatedProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedProduct: updatedProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find product", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-product";

    if ( !req.params.productId ) {
      return sendResponse( res, "grocRound-admin", false, "Product ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeProductById( req.params.productId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find product", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function invalidUpdateDetails ( req: express.Request ): boolean {

    if ( req.body.label && req.body.label !== "string" ) {
      return true;
    }

    if ( req.body.images ) {
      if ( !Array.isArray( req.body.images ) ) {
        return true;
      }
      for ( let i = 0; i < req.body.images.length; i++ ) {
        if ( typeof req.body.images[ i ] !== "string" ) {
          return true;
        }
      }
    }

    if ( req.body.prices ) {

      if ( !Array.isArray( req.body.prices ) ) {
        return true;
      }

      for ( let i = 0; i < req.body.prices.length; i++ ) {

        if ( typeof req.body.prices[ i ] !== "object" ) {
          return true;
        }

        if ( !req.body.prices[ i ].shop || typeof req.body.prices[ i ].shop !== "object" ) {
          return true;
        }
        if ( !req.body.prices[ i ].shop.shopId || typeof req.body.prices[ i ].shop.shopId !== "string" ) {
          return true;
        }
        if ( !req.body.prices[ i ].shop.shopName || typeof req.body.prices[ i ].shop.shopName !== "string" ) {
          return true;
        }

        if ( !req.body.prices[ i ].quantity || typeof req.body.prices[ i ].quantity !== "number" ) {
          return true;
        }

        if ( !req.body.prices[ i ].price || typeof req.body.prices[ i ].price !== "number" ) {
          return true;
        }

      }

    }

    if ( req.body.priceValues && typeof req.body.priceValues !== "object" ) {
      return true;
    }

    for ( let value of [ "min", "max", "median", "mean" ] ) {

      if ( req.body.priceValues[ value ] ) {

        if ( typeof req.body.priceValues[ value ] !== "object" ) {
          return true;
        }
        if ( !req.body.priceValues[ value ].shopId || typeof req.body.priceValues[ value ].shopId !== "string" ) {
          return true;
        }
        if ( !req.body.priceValues[ value ].price || typeof req.body.priceValues[ value ].price !== "number" ) {
          return true;
        }

      }

    }

    if ( req.body.effectivePrice ) {

      if ( typeof req.body.effectivePrice !== "object" ) {
        return true;
      }

      if ( req.body.effectivePrice.shopId && typeof req.body.effectivePrice.shopId !== "string" ) {
        return true;
      }
      if ( !req.body.effectivePrice.price || typeof req.body.effectivePrice.price !== "number" ) {
        return true;
      }

    }

    return false;

  }

  /*********************************************************/

  function invalidAddDetails ( req: express.Request ): boolean {

    if ( !req.body.label || req.body.label !== "string" ) {
      return true;
    }

    if ( req.body.images ) {
      if ( !Array.isArray( req.body.images ) ) {
        return true;
      }
      for ( let i = 0; i < req.body.images.length; i++ ) {
        if ( typeof req.body.images[ i ] !== "string" ) {
          return true;
        }
      }
    }

    if ( !req.body.prices || !Array.isArray( req.body.prices ) ) {
      return true;
    }

    for ( let i = 0; i < req.body.prices.length; i++ ) {

      if ( typeof req.body.prices[ i ] !== "object" ) {
        return true;
      }

      if ( !req.body.prices[ i ].shop || typeof req.body.prices[ i ].shop !== "object" ) {
        return true;
      }
      if ( !req.body.prices[ i ].shop.shopId || typeof req.body.prices[ i ].shop.shopId !== "string" ) {
        return true;
      }
      if ( !req.body.prices[ i ].shop.shopName || typeof req.body.prices[ i ].shop.shopName !== "string" ) {
        return true;
      }

      if ( !req.body.prices[ i ].quantity || typeof req.body.prices[ i ].quantity !== "number" ) {
        return true;
      }

      if ( !req.body.prices[ i ].price || typeof req.body.prices[ i ].price !== "number" ) {
        return true;
      }

    }

    if ( !req.body.priceValues || typeof req.body.priceValues !== "object" ) {
      return true;
    }

    for ( let value of [ "min", "max", "median", "mean" ] ) {

      if ( req.body.priceValues[ value ] ) {

        if ( typeof req.body.priceValues[ value ] !== "object" ) {
          return true;
        }
        if ( !req.body.priceValues[ value ].shopId || typeof req.body.priceValues[ value ].shopId !== "string" ) {
          return true;
        }
        if ( !req.body.priceValues[ value ].price || typeof req.body.priceValues[ value ].price !== "number" ) {
          return true;
        }

      }

    }

    if ( !req.body.effectivePrice || typeof req.body.effectivePrice !== "object" ) {
      return true;
    }
    if ( req.body.effectivePrice.shopId && typeof req.body.effectivePrice.shopId !== "string" ) {
      return true;
    }
    if ( !req.body.effectivePrice.price || typeof req.body.effectivePrice.price !== "number" ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/