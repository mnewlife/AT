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
      .then(( foundProducts: dataModel.grocRound.product.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundProducts: foundProducts,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

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

    console.log( "---" + req.params.productId );

    return findProductById( req.params.productId )
      .then(( foundProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundProduct: foundProduct,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        console.log( reason );

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
      priceValues: {
        min: { price: 0 },
        max: { price: 0 },
        median: { price: 0 },
        mean: { price: 0 }
      },
      effectivePrice: { price: 0 }
    };

    if ( req.body.effectivePrice ) {
      details.effectivePrice.price = req.body.effectivePrice.price;
      if ( req.body.effectivePrice.shopId ) {
        details.effectivePrice.shopId = req.body.effectivePrice.shopId;
      }
    }

    if ( req.body.images ) {
      details.images = [];
      req.body.images.forEach(( image: string ) => {
        details.images.push( image );
      } );
    }

    return createProduct( details )
      .then(( createdProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedProduct: createdProduct,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

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

    if ( req.body.imagesToAdd ) {
      details.imagesToAdd = req.body.imagesToAdd;
    }
    if ( req.body.imagesToRemove ) {
      details.imagesToRemove = req.body.imagesToRemove;
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
      .then(( updatedProduct: dataModel.grocRound.product.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedProduct: updatedProduct,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

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
      .then(( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

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

  return router;

}

/******************************************************************************/