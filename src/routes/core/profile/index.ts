/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as storageUser from "../../../components/storage/interfaces/core/user";
import * as helpers from "../../helpers/interfaces";
import * as profileProcedures from "../../../procedures/core/common/profile/interfaces";

/******************************************************************************/

export default (
  getUserDetails: profileProcedures.GetUserDetails,
  updateUserDetails: profileProcedures.UpdateUserDetails,
  changeUserEmailAddress: profileProcedures.ChangeEmailAddress,
  changeUserPassword: profileProcedures.ChangePassword,
  requestUserPasswordResetCode: profileProcedures.RequestPasswordResetCode,
  resetUserPassword: profileProcedures.ResetPassword,
  setViewContexts: helpers.SetViewContexts,
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  /*********************************************************/

  router.get( "/getDetails/:userId", getDetails );
  router.post( "/updateDetails/:userId", updateDetails );
  router.post( "/changeEmailAddress/:userId", changeEmailAddress );
  router.post( "/changePassword/:userId", changePassword );
  router.get( "/requestPasswordResetCode/:userId", requestPasswordResetCode );
  router.get( "/resetPassword/:userId", resetPassword );

  /*********************************************************/

  function getDetails ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    let foundUser: dataModel.core.user.Super;

    return getUserDetails( req.params.userId )
      .then(( user: dataModel.core.user.Super ) => {

        foundUser = user;
        return setViewContexts( req, user );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        output.payload.foundUser = foundUser;
        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );

  }

  /*********************************************************/

  function updateDetails ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    let details: storageUser.UpdateDetails;

    if ( req.body.personalDetails ) {
      details.personalDetails = {};
      if ( req.body.personalDetails.firstName ) {
        details.personalDetails.firstName = req.body.personalDetails.firstName;
      }
      if ( req.body.personalDetails.lastName ) {
        details.personalDetails.lastName = req.body.personalDetails.lastName;
      }
    }

    if ( req.body.contactDetails ) {
      details.contactDetails = {};
      if ( req.body.contactDetails.phoneNumbersToAdd ) {
        details.contactDetails.phoneNumbersToAdd = req.body.contactDetails.phoneNumbersToAdd;
      }
      if ( req.body.contactDetails.phoneNumbersToRemove ) {
        details.contactDetails.phoneNumbersToRemove = req.body.contactDetails.phoneNumbersToRemove;
      }
    }

    if ( req.body.residentialDetails ) {
      details.residentialDetails = {};
      if ( req.body.residentialDetails.country ) {
        details.residentialDetails.country = req.body.residentialDetails.country;
      }
      if ( req.body.residentialDetails.province ) {
        details.residentialDetails.province = req.body.residentialDetails.province;
      }
      if ( req.body.residentialDetails.address ) {
        details.residentialDetails.address = req.body.residentialDetails.address;
      }
    }

    if ( !details ) {
      return sendResponse( res, "core-consumer", false, "", null );
    }

    let user: dataModel.core.user.Super;

    return updateUserDetails( req.params.userId, details )
      .then(( updatedUser: dataModel.core.user.Super ) => {

        user = updatedUser;
        return setViewContexts( req, updatedUser );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        output.payload.updatedUser = user;
        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );


  }

  /*********************************************************/

  function changeEmailAddress ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    if ( req.body.password ) {
      return sendResponse( res, "core-consumer", false, "Password is missing", null );
    }

    if ( req.body.newEmailAddress ) {
      return sendResponse( res, "core-consumer", false, "The new email address is missing", null );
    }

    return changeUserEmailAddress( req.params.userId, req.body.password, req.body.newEmailAddress, req )
      .then(( response: any ) => {

        return setViewContexts( req );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );

  }

  /*********************************************************/

  function changePassword ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    if ( req.body.oldPassword ) {
      return sendResponse( res, "core-consumer", false, "Password is missing", null );
    }

    if ( req.body.newPassword ) {
      return sendResponse( res, "core-consumer", false, "The new password is missing", null );
    }

    return changeUserPassword( req.params.userId, req.body.oldPassword, req.body.newPassword )
      .then(( response: any ) => {

        return setViewContexts( req );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        if ( reason.identifier && reason.identifier == "InvalidPassword" ) {
          return sendResponse( res, "core-consumer", false, "InvalidPassword", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );

  }

  /*********************************************************/

  function requestPasswordResetCode ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    return requestUserPasswordResetCode( req.params.userId )
      .then(( response: any ) => {

        return setViewContexts( req );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );

  }

  /*********************************************************/

  function resetPassword ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( req.params.userId ) {
      return sendResponse( res, "core-consumer", false, "User ID is missing", null );
    }

    return resetUserPassword( req.params.userId, req.query.resetCode, req.query.newPassword )
      .then(( response: any ) => {

        return setViewContexts( req );

      } )
      .then(( output: helpers.ContextsOutput ) => {

        return sendResponse( res, output.view, true, null, output.payload );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "core-consumer", false, "User not found", null );
        }

        if ( reason.identifier && reason.identifier == "InvalidResetCode" ) {
          return sendResponse( res, "core-consumer", false, "InvalidResetCode", null );
        }

        return sendResponse( res, "core-consumer", false, null, null );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/