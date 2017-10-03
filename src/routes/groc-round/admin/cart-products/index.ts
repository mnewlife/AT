/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageCartProduct from "../../../../components/storage/interfaces/groc-round/cart-product";

import * as coreValidationAdd from "../../../core/validation-add";
import * as coreValidationUpdate from "../../../core/validation-update";
import * as validationAdd from "../../validation-add";
import * as validationUpdate from "../../validation-update";

/******************************************************************************/

export default (
  findCartProducts: storageCartProduct.Instance[ "get" ],
  findCartProductById: storageCartProduct.Instance[ "getById" ],
  createCartProduct: storageCartProduct.Instance[ "add" ],
  updateCartProductById: storageCartProduct.Instance[ "updateById" ],
  removeCartProductById: storageCartProduct.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getCartProducts", getCartProducts );
  router.get( "/getCartProduct/:cartProductId", getCartProduct );
  router.post( "/addCartProduct", addCartProduct );
  router.post( "/updateCartProduct/:cartProductId", updateCartProduct );
  router.get( "/deleteCartProduct/:cartProductId", deleteCartProduct );

  /*********************************************************/

  function getCartProducts ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-cartProducts";

    return findCartProducts( null, null, null )
      .then( ( foundCartProducts: dataModel.grocRound.cartProduct.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundCartProducts: foundCartProducts,
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

  function getCartProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-cartProduct";

    if ( !req.params.cartProductId ) {
      return sendResponse( res, "grocRound-admin", false, "CartProduct ID is missing", {
        innerContext: innerContext
      } );
    }

    return findCartProductById( req.params.cartProductId )
      .then( ( foundCartProduct: dataModel.grocRound.cartProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundCartProduct: foundCartProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find cartProduct", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addCartProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-cartProduct";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageCartProduct.AddDetails = {
      user: req.body.user,
      round: req.body.round,
      cartId: req.body.cartId,
      product: req.body.product
    };

    return createCartProduct( details )
      .then( ( createdCartProduct: dataModel.grocRound.cartProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedCartProduct: createdCartProduct,
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

  function updateCartProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-cartProduct";

    if ( !req.params.cartProductId ) {
      return sendResponse( res, "grocRound-admin", false, "CartProduct ID is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageCartProduct.UpdateDetails = {};

    if ( req.body.user ) {
      details.user = req.body.user;
    }

    if ( req.body.round ) {
      details.round = req.body.round;
    }

    if ( req.body.cartId ) {
      details.cartId = req.body.cartId;
    }

    if ( req.body.product ) {
      details.product = req.body.product;
    }

    return updateCartProductById( req.params.cartProductId, details )
      .then( ( updatedCartProduct: dataModel.grocRound.cartProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedCartProduct: updatedCartProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find cartProduct", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteCartProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-cartProduct";

    if ( !req.params.cartProductId ) {
      return sendResponse( res, "grocRound-admin", false, "CartProduct ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeCartProductById( req.params.cartProductId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find cartProduct", {
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

    if ( coreValidationUpdate.user( req ) ) {
      return true;
    }

    if ( validationUpdate.round( req ) ) {
      return true;
    }

    if ( req.body.cartId && typeof req.body.cartId == "string" ) {
      return true;
    }

    if ( validationUpdate.product( req ) ) {
      return true;
    }
    if ( req.body.quantity && typeof req.body.quantity == "number" ) {
      return false;
    }
    if ( req.body.value && typeof req.body.value == "number" ) {
      return false;
    }

    return false;

  }

  /*********************************************************/

  function invalidAddDetails ( req: express.Request ): boolean {

    if ( coreValidationAdd.user( req ) ) {
      return true;
    }

    if ( validationAdd.round( req ) ) {
      return true;
    }

    if ( !req.body.cartId || typeof req.body.cartId !== "string" ) {
      return true;
    }

    if ( validationAdd.product( req ) ) {
      return true;
    }
    if ( !req.body.quantity || typeof req.body.quantity !== "number" ) {
      return false;
    }
    if ( !req.body.value || typeof req.body.value !== "number" ) {
      return false;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/