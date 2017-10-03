/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageCart from "../../../../components/storage/interfaces/groc-round/cart";

import * as coreValidationAdd from "../../../core/validation-add";
import * as coreValidationUpdate from "../../../core/validation-update";
import * as validationAdd from "../../validation-add";
import * as validationUpdate from "../../validation-update";

/******************************************************************************/

export default (
  findCarts: storageCart.Instance[ "get" ],
  findCartById: storageCart.Instance[ "getById" ],
  updateCartById: storageCart.Instance[ "updateById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getCarts", getCarts );
  router.get( "/getCart/:cartId", getCart );
  router.post( "/updateCart/:cartId", updateCart );

  /*********************************************************/

  function getCarts ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-carts";

    return findCarts( null, null, null )
      .then( ( foundCarts: dataModel.grocRound.cart.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundCarts: foundCarts,
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

  function getCart ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-cart";

    if ( !req.params.cartId ) {
      return sendResponse( res, "grocRound-admin", false, "Cart ID is missing", {
        innerContext: innerContext
      } );
    }

    return findCartById( req.params.cartId )
      .then( ( foundCart: dataModel.grocRound.cart.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundCart: foundCart,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find cart", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function updateCart ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-cart";

    if ( !req.params.cartId ) {
      return sendResponse( res, "grocRound-admin", false, "Cart ID is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageCart.UpdateDetails = {};

    if ( req.body.user ) {
      details.user = req.body.user;
    }

    if ( req.body.round ) {
      details.round = req.body.round;
    }

    if ( req.body.adminFeePercentage ) {
      details.adminFeePercentage = req.body.adminFeePercentage;
    }

    if ( req.body.numProducts ) {
      details.numProducts = req.body.numProducts;
    }

    if ( req.body.valueProducts ) {
      details.valueProducts = req.body.valueProducts;
    }

    return updateCartById( req.params.cartId, details )
      .then( ( updatedCart: dataModel.grocRound.cart.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedCart: updatedCart,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find cart", {
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

    if ( req.body.adminFeePercentage && typeof req.body.adminFeePercentage !== "number" ) {
      return true;
    }

    if ( req.body.numProducts && typeof req.body.numProducts !== "number" ) {
      return true;
    }

    if ( req.body.valueProducts && typeof req.body.valueProducts !== "number" ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/