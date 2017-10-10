/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageRoundContributor from "../../../../components/storage/interfaces/groc-round/round-contributor";

import * as coreValidationAdd from "../../../core/validation-add";
import * as coreValidationUpdate from "../../../core/validation-update";
import * as validationAdd from "../../validation-add";
import * as validationUpdate from "../../validation-update";

import * as blocks from "../../../validation/validation-blocks";

/******************************************************************************/

export default (
  findRoundContributors: storageRoundContributor.Instance[ "get" ],
  findRoundContributorById: storageRoundContributor.Instance[ "getById" ],
  createRoundContributor: storageRoundContributor.Instance[ "add" ],
  updateRoundContributorById: storageRoundContributor.Instance[ "updateById" ],
  removeRoundContributorById: storageRoundContributor.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getRoundContributors", getRoundContributors );
  router.get( "/getRoundContributor/:roundContributorId", getRoundContributor );
  router.post( "/addRoundContributor", addRoundContributor );
  router.post( "/updateRoundContributor/:roundContributorId", updateRoundContributor );
  router.get( "/deleteRoundContributor/:roundContributorId", deleteRoundContributor );

  /*********************************************************/

  function getRoundContributors ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-roundContributors";

    let fc: storageRoundContributor.FiltrationCriteria = {};

    if ( req.query.userId ) {
      fc.user = {
        userId: req.query.userId
      };
    }

    if ( req.query.roundId ) {
      fc.round = {
        roundId: req.query.roundId
      };
    }

    return findRoundContributors( fc, null, null )
      .then( ( foundRoundContributors: dataModel.grocRound.roundContributor.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundRoundContributors: foundRoundContributors,
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

  function getRoundContributor ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-roundContributor";

    if ( !req.params.roundContributorId ) {
      return sendResponse( res, "grocRound-admin", false, "RoundContributor ID is missing", {
        innerContext: innerContext
      } );
    }

    return findRoundContributorById( req.params.roundContributorId )
      .then( ( foundRoundContributor: dataModel.grocRound.roundContributor.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundRoundContributor: foundRoundContributor,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find roundContributor", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addRoundContributor ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-roundContributor";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageRoundContributor.AddDetails = {
      round: req.body.round,
      user: req.body.user,
      contributions: {
        num: 0,
        value: 0,
        valueDue: 0
      },
      tracks: [],
      cart: {
        num: 0,
        value: 0
      },
      deliveryFees: {
        valuePaid: 0,
        valueDue: 0
      },
      complete: false
    };

    return createRoundContributor( details )
      .then( ( createdRoundContributor: dataModel.grocRound.roundContributor.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedRoundContributor: createdRoundContributor,
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

  function updateRoundContributor ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-roundContributor";

    if ( !req.params.roundContributorId ) {
      return sendResponse( res, "grocRound-admin", false, "Update id is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageRoundContributor.UpdateDetails = {};

    if ( req.body.complete ) {
      details.complete = req.body.complete;
    }

    return updateRoundContributorById( req.params.roundContributorId, details )
      .then( ( updatedRoundContributor: dataModel.grocRound.roundContributor.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedRoundContributor: updatedRoundContributor,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find roundContributor", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteRoundContributor ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-roundContributor";

    if ( !req.params.roundContributorId ) {
      return sendResponse( res, "grocRound-admin", false, "RoundContributor ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeRoundContributorById( req.params.roundContributorId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find roundContributor", {
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

    if ( blocks.optionalWrong( req.body, "complete", "boolean" ) ) {
      return true;
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

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/