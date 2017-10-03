/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageTrack from "../../../../components/storage/interfaces/groc-round/track";

import * as blocks from "../../../validation/validation-blocks";
import * as v from "../../../validation/validation-revised";

/******************************************************************************/

export default (
  findTracks: storageTrack.Instance[ "get" ],
  findTrackById: storageTrack.Instance[ "getById" ],
  createTrack: storageTrack.Instance[ "add" ],
  updateTrackById: storageTrack.Instance[ "updateById" ],
  removeTrackById: storageTrack.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getTracks", getTracks );
  router.get( "/getTrack/:trackId", getTrack );
  router.post( "/addTrack", addTrack );
  router.post( "/updateTrack/:trackId", updateTrack );
  router.get( "/deleteTrack/:trackId", deleteTrack );

  /*********************************************************/

  function getTracks ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-tracks";

    return findTracks( null, null, null )
      .then( ( foundTracks: dataModel.grocRound.track.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundTracks: foundTracks,
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

  function getTrack ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-track";

    if ( !req.params.trackId ) {
      return sendResponse( res, "grocRound-admin", false, "Track ID is missing", {
        innerContext: innerContext
      } );
    }

    return findTrackById( req.params.trackId )
      .then( ( foundTrack: dataModel.grocRound.track.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundTrack: foundTrack,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find track", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addTrack ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-track";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageTrack.AddDetails = {
      round: req.body.round,
      trackName: req.body.trackName,
      contributions: req.body.contributions,
      adminFeePercentage: req.body.adminFeePercentage,
      products: req.body.products
    };

    return createTrack( details )
      .then( ( createdTrack: dataModel.grocRound.track.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedTrack: createdTrack,
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

  function updateTrack ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-track";

    if ( !req.params.trackId ) {
      return sendResponse( res, "grocRound-admin", false, "Update id is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageTrack.UpdateDetails = {};

    if ( req.body.trackName ) {
      details.trackName = req.body.trackName;
    }

    if ( req.body.round ) {
      details.round = req.body.round;
    }

    if ( req.body.contributions ) {
      details.contributions = req.body.contributions;
    }

    if ( req.body.adminFeePercentage ) {
      details.adminFeePercentage = req.body.adminFeePercentage;
    }

    if ( req.body.products ) {
      details.products = req.body.products;
    }

    return updateTrackById( req.params.trackId, details )
      .then( ( updatedTrack: dataModel.grocRound.track.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedTrack: updatedTrack,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find track", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteTrack ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-track";

    if ( !req.params.trackId ) {
      return sendResponse( res, "grocRound-admin", false, "Track ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeTrackById( req.params.trackId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find track", {
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

    if ( v.round.optional( req.body ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "trackName", "string" ) ) {
      return true;
    }

    let parent = "contributions";
    if ( blocks.optionalWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "installmentValue", "number" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "totalValue", "number" ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "adminFeePercentage", "number" ) ) {
      return true;
    }

    parent = "products";
    if ( blocks.optionalWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "num", "number" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "value", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  function invalidAddDetails ( req: express.Request ): boolean {

    if ( v.round.absent( req.body ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "trackName", "string" ) ) {
      return true;
    }

    let parent = "contributions";
    if ( blocks.absentWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "installmentValue", "number" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "totalValue", "number" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "adminFeePercentage", "number" ) ) {
      return true;
    }

    parent = "products";
    if ( blocks.absentWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "num", "number" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "value", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/