/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageContribution from "../../../../components/storage/interfaces/groc-round/contribution";

import * as coreValidationAdd from "../../../core/validation-add";
import * as coreValidationUpdate from "../../../core/validation-update";
import * as validationAdd from "../../validation-add";
import * as validationUpdate from "../../validation-update";

/******************************************************************************/

export default (
  findContributions: storageContribution.Instance[ "get" ],
  findContributionById: storageContribution.Instance[ "getById" ],
  createContribution: storageContribution.Instance[ "add" ],
  updateContributionById: storageContribution.Instance[ "updateById" ],
  removeContributionById: storageContribution.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getContributions", getContributions );
  router.get( "/getContribution/:contributionId", getContribution );
  router.post( "/addContribution", addContribution );
  router.post( "/updateContribution/:contributionId", updateContribution );
  router.get( "/deleteContribution/:contributionId", deleteContribution );

  /*********************************************************/

  function getContributions ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-contributions";

    let fc: storageContribution.FiltrationCriteria = {};

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

    return findContributions( fc, null, null )
      .then( ( foundContributions: dataModel.grocRound.contribution.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundContributions: foundContributions,
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

  function getContribution ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-contribution";

    if ( !req.params.contributionId ) {
      return sendResponse( res, "grocRound-admin", false, "Contribution ID is missing", {
        innerContext: innerContext
      } );
    }

    return findContributionById( req.params.contributionId )
      .then( ( foundContribution: dataModel.grocRound.contribution.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundContribution: foundContribution,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find contribution", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addContribution ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-contribution";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageContribution.AddDetails = {
      user: req.body.user,
      round: req.body.round,
      payment: req.body.payment
    };

    return createContribution( details )
      .then( ( createdContribution: dataModel.grocRound.contribution.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedContribution: createdContribution,
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

  function updateContribution ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-contribution";

    if ( !req.params.contributionId ) {
      return sendResponse( res, "grocRound-admin", false, "Contribution ID is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageContribution.UpdateDetails = {};

    if ( req.body.round ) {
      details.round = req.body.round;
    }

    if ( req.body.payment ) {
      details.payment = req.body.payment;
    }

    return updateContributionById( req.params.contributionId, details )
      .then( ( updatedContribution: dataModel.grocRound.contribution.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedContribution: updatedContribution,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find contribution", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteContribution ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-contribution";

    if ( !req.params.contributionId ) {
      return sendResponse( res, "grocRound-admin", false, "Contribution ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeContributionById( req.params.contributionId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find contribution", {
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

    if ( validationUpdate.round( req ) ) {
      return true;
    }

    if ( req.body.payment && typeof req.body.payment !== "object" ) {
      return true;
    }
    if ( req.body.payment.identifier && typeof req.body.payment.identifier !== "string" ) {
      return true;
    }
    if ( req.body.payment.amount && typeof req.body.payment.amount !== "number" ) {
      return true;
    }
    if ( req.body.payment.method && typeof req.body.payment.method !== "string" ) {
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

    if ( !req.body.payment || typeof req.body.payment !== "object" ) {
      return true;
    }
    if ( !req.body.payment.identifier || typeof req.body.payment.identifier !== "string" ) {
      return true;
    }
    if ( !req.body.payment.amount || typeof req.body.payment.amount !== "number" ) {
      return true;
    }
    if ( req.body.payment.method && typeof req.body.payment.method !== "string" ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/