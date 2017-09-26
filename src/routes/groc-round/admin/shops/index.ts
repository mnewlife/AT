/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageShop from "../../../../components/storage/interfaces/groc-round/shop";

/******************************************************************************/

export default (
  findShops: storageShop.Instance[ "get" ],
  findShopById: storageShop.Instance[ "getById" ],
  createShop: storageShop.Instance[ "add" ],
  updateShopById: storageShop.Instance[ "updateById" ],
  removeShopById: storageShop.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getShops", getShops );
  router.get( "/getShop/:shopId", getShop );
  router.post( "/addShop", addShop );
  router.post( "/updateShop/:shopId", updateShop );
  router.get( "/deleteShop/:shopId", deleteShop );

  /*********************************************************/

  function getShops ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-shops";

    return findShops( null, null, null )
      .then(( foundShops: dataModel.grocRound.shop.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundShops: foundShops,
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

  function getShop ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-shop";

    if ( !req.params.shopId ) {
      return sendResponse( res, "grocRound-admin", false, "Shop ID is missing", {
        innerContext: innerContext
      } );
    }

    return findShopById( req.params.shopId )
      .then(( foundShop: dataModel.grocRound.shop.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundShop: foundShop,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find shop", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addShop ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-shop";

    if ( !req.body.shopName ) {
      return sendResponse( res, "grocRound-admin", false, "Shop name is missing", {
        innerContext: innerContext
      } );
    }

    let details: storageShop.AddDetails = {
      shopName: req.body.shopName,
      numProducts: 0
    };

    if ( req.body.images ) {
      details.images = [];
      req.body.images.forEach(( image: string ) => {
        details.images.push( image );
      } );
    }

    return createShop( details )
      .then(( createdShop: dataModel.grocRound.shop.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedShop: createdShop,
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

  function updateShop ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-shop";

    if ( !req.params.shopId ) {
      return sendResponse( res, "grocRound-admin", false, "Shop ID is missing", {
        innerContext: innerContext
      } );
    }

    let details: storageShop.UpdateDetails = {};

    if ( req.body.shopName ) {
      details.shopName = req.body.shopName;
    }

    if ( req.body.imagesToAdd ) {
      details.imagesToAdd = req.body.imagesToAdd;
    }
    if ( req.body.imagesToRemove ) {
      details.imagesToRemove = req.body.imagesToRemove;
    }

    return updateShopById( req.params.shopId, details )
      .then(( updatedShop: dataModel.grocRound.shop.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedShop: updatedShop,
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find shop", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteShop ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-shop";

    if ( !req.params.shopId ) {
      return sendResponse( res, "grocRound-admin", false, "Shop ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeShopById( req.params.shopId )
      .then(( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find shop", {
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