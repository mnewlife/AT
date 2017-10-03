/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageRound from "../../../../components/storage/interfaces/groc-round/round";

import * as blocks from "../../../validation/validation-blocks";

/******************************************************************************/

export default (
  findRounds: storageRound.Instance[ "get" ],
  findRoundById: storageRound.Instance[ "getById" ],
  createRound: storageRound.Instance[ "add" ],
  updateRoundById: storageRound.Instance[ "updateById" ],
  removeRoundById: storageRound.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getRounds", getRounds );
  router.get( "/getRound/:roundId", getRound );
  router.post( "/addRound", addRound );
  router.post( "/updateRound/:roundId", updateRound );
  router.get( "/deleteRound/:roundId", deleteRound );

  /*********************************************************/

  function getRounds ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-rounds";

    return findRounds( null, null, null )
      .then( ( foundRounds: dataModel.grocRound.round.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundRounds: foundRounds,
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

  function getRound ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-round";

    if ( !req.params.roundId ) {
      return sendResponse( res, "grocRound-admin", false, "Round ID is missing", {
        innerContext: innerContext
      } );
    }

    return findRoundById( req.params.roundId )
      .then( ( foundRound: dataModel.grocRound.round.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundRound: foundRound,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find round", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addRound ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-round";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageRound.AddDetails = {
      roundName: req.body.roundName,
      inProgress: req.body.inProgress,
      duration: req.body.duration,
      deliveries: req.body.deliveries,
      contributions: req.body.contributions,
      numTracks: req.body.numTracks,
      valueCartProducts: req.body.valueCartProducts
    };

    return createRound( details )
      .then( ( createdRound: dataModel.grocRound.round.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedRound: createdRound,
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

  function updateRound ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-round";

    if ( !req.params.roundId ) {
      return sendResponse( res, "grocRound-admin", false, "Update id is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageRound.UpdateDetails = {};

    if ( req.body.roundName ) {
      details.roundName = req.body.roundName;
    }

    if ( req.body.inProgress ) {
      details.inProgress = req.body.inProgress;
    }

    if ( req.body.duration ) {
      details.duration = req.body.duration;
    }

    if ( req.body.deliveries ) {
      details.deliveries = req.body.deliveries;
    }

    if ( req.body.contributions ) {
      details.contributions = req.body.contributions;
    }

    if ( req.body.numTracks ) {
      details.numTracks = req.body.numTracks;
    }

    if ( req.body.valueCartProducts ) {
      details.valueCartProducts = req.body.valueCartProducts;
    }

    return updateRoundById( req.params.roundId, details )
      .then( ( updatedRound: dataModel.grocRound.round.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedRound: updatedRound,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find round", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteRound ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-round";

    if ( !req.params.roundId ) {
      return sendResponse( res, "grocRound-admin", false, "Round ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeRoundById( req.params.roundId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find round", {
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

    if ( blocks.optionalWrong( req.body, "roundName", "string" ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "inProgress", "boolean" ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "duration", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.duration, "start", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.duration, "end", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.duration, "months", "number" ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "deliveries", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.deliveries, "fee", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.deliveries, "numPayments", "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body.deliveries, "valuePayments", "number" ) ) {
      return true;
    }

    let parent = "contributions";
    if ( blocks.optionalWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "num", "number" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body[ parent ], "value", "number" ) ) {
      return true;
    }

    if ( blocks.optionalWrong( req.body, "numTracks", "number" ) ) {
      return true;
    }
    if ( blocks.optionalWrong( req.body, "valueCartProducts", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  function invalidAddDetails ( req: express.Request ): boolean {

    if ( blocks.absentWrong( req.body, "roundName", "string" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "inProgress", "boolean" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "duration", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.duration, "start", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.duration, "end", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.duration, "months", "number" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "deliveries", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.deliveries, "fee", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.deliveries, "numPayments", "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body.deliveries, "valuePayments", "number" ) ) {
      return true;
    }

    let parent = "contributions";
    if ( blocks.absentWrong( req.body, parent, "object" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "num", "number" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body[ parent ], "value", "number" ) ) {
      return true;
    }

    if ( blocks.absentWrong( req.body, "numTracks", "number" ) ) {
      return true;
    }
    if ( blocks.absentWrong( req.body, "valueCartProducts", "number" ) ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/