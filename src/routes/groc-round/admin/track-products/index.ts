/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageTrackProduct from "../../../../components/storage/interfaces/groc-round/track-product";

import * as blocks from "../../../validation/validation-blocks";
import * as v from "../../../validation/validation-revised";

/******************************************************************************/

export default (
  findTrackProducts: storageTrackProduct.Instance[ "get" ],
  findTrackProductById: storageTrackProduct.Instance[ "getById" ],
  createTrackProduct: storageTrackProduct.Instance[ "add" ],
  updateTrackProductById: storageTrackProduct.Instance[ "updateById" ],
  removeTrackProductById: storageTrackProduct.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getTrackProducts", getTrackProducts );
  router.get( "/getTrackProduct/:trackProductId", getTrackProduct );
  router.post( "/addTrackProduct", addTrackProduct );
  router.post( "/updateTrackProduct/:trackProductId", updateTrackProduct );
  router.get( "/deleteTrackProduct/:trackProductId", deleteTrackProduct );

  /*********************************************************/

  function getTrackProducts ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-trackProducts";

    let fc: storageTrackProduct.FiltrationCriteria = {};

    if ( req.query.trackId ) {
      fc.track = {
        trackId: req.query.trackId
      };
    }

    return findTrackProducts( fc, null, null )
      .then( ( foundTrackProducts: dataModel.grocRound.trackProduct.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundTrackProducts: foundTrackProducts,
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

  function getTrackProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-trackProduct";

    if ( !req.params.trackProductId ) {
      return sendResponse( res, "grocRound-admin", false, "TrackProduct ID is missing", {
        innerContext: innerContext
      } );
    }

    return findTrackProductById( req.params.trackProductId )
      .then( ( foundTrackProduct: dataModel.grocRound.trackProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundTrackProduct: foundTrackProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find trackProduct", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addTrackProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-trackProduct";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageTrackProduct.AddDetails = {
      track: req.body.track,
      product: req.body.product,
      quantity: req.body.quantity,
      value: req.body.value
    };

    return createTrackProduct( details )
      .then( ( createdTrackProduct: dataModel.grocRound.trackProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedTrackProduct: createdTrackProduct,
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

  function updateTrackProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-trackProduct";

    if ( !req.params.trackProductId ) {
      return sendResponse( res, "grocRound-admin", false, "Update id is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageTrackProduct.UpdateDetails = {};

    if ( req.body.quantity ) {
      details.quantity = req.body.quantity;
    }

    if ( req.body.value ) {
      details.value = req.body.value;
    }

    return updateTrackProductById( req.params.trackProductId, details )
      .then( ( updatedTrackProduct: dataModel.grocRound.trackProduct.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedTrackProduct: updatedTrackProduct,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find trackProduct", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteTrackProduct ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-trackProduct";

    if ( !req.params.trackProductId ) {
      return sendResponse( res, "grocRound-admin", false, "TrackProduct ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeTrackProductById( req.params.trackProductId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find trackProduct", {
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

    if ( blocks.absentWrong( req.body, "quantity", "number" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "value", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  function invalidAddDetails ( req: express.Request ): boolean {

    if ( v.track.absent( req.body ) ) {
      return true;
    }

    if ( v.product.absent( req.body ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "quantity", "number" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "value", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/