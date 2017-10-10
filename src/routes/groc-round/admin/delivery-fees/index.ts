/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageDeliveryFee from "../../../../components/storage/interfaces/groc-round/delivery-fee";

import * as coreValidationAdd from "../../../core/validation-add";
import * as coreValidationUpdate from "../../../core/validation-update";
import * as validationAdd from "../../validation-add";
import * as validationUpdate from "../../validation-update";

/******************************************************************************/

export default (
  findDeliveryFees: storageDeliveryFee.Instance[ "get" ],
  findDeliveryFeeById: storageDeliveryFee.Instance[ "getById" ],
  createDeliveryFee: storageDeliveryFee.Instance[ "add" ],
  updateDeliveryFeeById: storageDeliveryFee.Instance[ "updateById" ],
  removeDeliveryFeeById: storageDeliveryFee.Instance[ "removeById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getDeliveryFees", getDeliveryFees );
  router.get( "/getDeliveryFee/:deliveryFeeId", getDeliveryFee );
  router.post( "/addDeliveryFee", addDeliveryFee );
  router.post( "/updateDeliveryFee/:deliveryFeeId", updateDeliveryFee );
  router.get( "/deleteDeliveryFee/:deliveryFeeId", deleteDeliveryFee );

  /*********************************************************/

  function getDeliveryFees ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-deliveryFees";

    let fc: storageDeliveryFee.FiltrationCriteria = {};

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

    return findDeliveryFees( fc, null, null )
      .then( ( foundDeliveryFees: dataModel.grocRound.deliveryFee.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundDeliveryFees: foundDeliveryFees,
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

  function getDeliveryFee ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-deliveryFee";

    if ( !req.params.deliveryFeeId ) {
      return sendResponse( res, "grocRound-admin", false, "DeliveryFee ID is missing", {
        innerContext: innerContext
      } );
    }

    return findDeliveryFeeById( req.params.deliveryFeeId )
      .then( ( foundDeliveryFee: dataModel.grocRound.deliveryFee.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundDeliveryFee: foundDeliveryFee,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find deliveryFee", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function addDeliveryFee ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "add-deliveryFee";

    if ( invalidAddDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageDeliveryFee.AddDetails = {
      user: req.body.user,
      round: req.body.round,
      payment: req.body.payment
    };

    return createDeliveryFee( details )
      .then( ( createdDeliveryFee: dataModel.grocRound.deliveryFee.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          addedDeliveryFee: createdDeliveryFee,
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

  function updateDeliveryFee ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "update-deliveryFee";

    if ( !req.params.deliveryFeeId ) {
      return sendResponse( res, "grocRound-admin", false, "Update id is missing", {
        innerContext: innerContext
      } );
    }

    if ( invalidUpdateDetails( req ) ) {
      return sendResponse( res, "grocRound-admin", false, "Something is wrong with the data you sent", {
        innerContext: innerContext
      } );
    }

    let details: storageDeliveryFee.UpdateDetails = {};

    if ( req.body.user ) {
      details.user = req.body.user;
    }

    if ( req.body.round ) {
      details.round = req.body.round;
    }

    if ( req.body.payment ) {
      details.payment = req.body.payment;
    }

    return updateDeliveryFeeById( req.params.deliveryFeeId, details )
      .then( ( updatedDeliveryFee: dataModel.grocRound.deliveryFee.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          updatedDeliveryFee: updatedDeliveryFee,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find deliveryFee", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function deleteDeliveryFee ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "delete-deliveryFee";

    if ( !req.params.deliveryFeeId ) {
      return sendResponse( res, "grocRound-admin", false, "DeliveryFee ID is missing", {
        innerContext: innerContext
      } );
    }

    return removeDeliveryFeeById( req.params.deliveryFeeId )
      .then( ( response: any ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find deliveryFee", {
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

    if ( req.body.payment && typeof req.body.payment !== "object" ) {
      return true;
    }
    if ( req.body.payment.identifier && typeof req.body.payment.identifier !== "string" ) {
      return true;
    }
    if ( req.body.payment.amount && typeof req.body.payment.amount !== "number" ) {
      return true;
    }
    if ( req.body.payment.identifier && typeof req.body.payment.identifier !== "string" ) {
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
    if ( !req.body.payment.identifier || typeof req.body.payment.identifier !== "string" ) {
      return true;
    }

    return false;

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/