/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storagePrice from "../../../../components/storage/interfaces/groc-round/price";

/******************************************************************************/

export default (
  findPrices: storagePrice.Instance[ "get" ],
  findPriceById: storagePrice.Instance[ "getById" ],
  createPrice: storagePrice.Instance[ "add" ],
  updatePriceById: storagePrice.Instance[ "updateById" ],
  removePriceById: storagePrice.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getPrices", getPrices );
  router.get( "/getPrice/:priceId", getPrice );
  router.post( "/addPrice", addPrice );
  router.post( "/updatePrice/:priceId", updatePrice );
  router.get( "/deletePrice/:priceId", deletePrice );

  /*********************************************************/

  function getPrices ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-prices";

    let filtrationCriteria: storagePrice.FiltrationCriteria = {};

    if ( req.query.productId ) {
      filtrationCriteria.productId = req.query.productId;
    }

    if ( req.query.shopId ) {
      filtrationCriteria.shopId = req.query.shopId;
    }

    return findPrices( filtrationCriteria, null, null )
      .then(( foundPrices: dataModel.grocRound.price.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundPrices: foundPrices,
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

  function getPrice ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-price";

    if ( !req.params.priceId ) {
      return sendResponse( res, "grocRound-admin", false, "Price ID is missing", {
        innerContext: innerContext
      } );
    }

    return findPriceById( req.params.priceId )
      .then(( foundPrice: dataModel.grocRound.price.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundPrice: foundPrice,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find price", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addPrice ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-price";

    if ( !req.body.priceName ) {
      return sendResponse( res, "grocRound-admin", false, "Price name is missing", {
        innerContext: innerContext
      } );
    }

    let details: storagePrice.AddDetails = {
      productId: req.body.productId,
      shopId: req.body.shopId,
      quantity: req.body.quantity,
      price: req.body.price
    };

    return createPrice( details )
      .then(( createdPrice: dataModel.grocRound.price.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedPrice: createdPrice,
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

  function updatePrice ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-price";

    if ( !req.params.priceId ) {
      return sendResponse( res, "grocRound-admin", false, "Price ID is missing", {
        innerContext: innerContext
      } );
    }

    let details: storagePrice.UpdateDetails = {};

    /**
     * productId: req.body.productId,
      shopId: req.body.shopId,
      quantity: req.body.quantity,
      price: req.body.price
     */

    if ( req.body.productId ) {
      details.productId = req.body.productId;
    }
    if ( req.body.shopId ) {
      details.shopId = req.body.shopId;
    }
    if ( req.body.quantity ) {
      details.quantity = req.body.quantity;
    }
    if ( req.body.price ) {
      details.price = req.body.price;
    }

    return updatePriceById( req.params.priceId, details )
      .then(( updatedPrice: dataModel.grocRound.price.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedPrice: updatedPrice,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find price", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deletePrice ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-price";

    if ( !req.params.priceId ) {
      return sendResponse( res, "grocRound-admin", false, "Price ID is missing", {
        innerContext: innerContext
      } );
    }

    return removePriceById( req.params.priceId )
      .then(( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find price", {
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