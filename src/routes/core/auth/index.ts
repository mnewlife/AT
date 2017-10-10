/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../data-model";
import * as root from "../../../interfaces";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as session from "../../../components/session/interfaces";
import * as helpers from "../../helpers/interfaces";
import * as authProcedures from "../../../procedures/core/common/auth/interfaces";

/******************************************************************************/

export default (
  signInProcedure: authProcedures.SignIn,
  signOutOfSession: session.SignOut,
  validateAppContext: helpers.ValidateAppContext,
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.post( "/signIn", signIn );
  router.get( "/signOut", signOut );

  /*********************************************************/

  function signIn ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let currentUser: dataModel.core.user.Super;

    if ( !req.body.emailAddress ) {
      return sendResponse( res, "passpoint", false, "Email address is missing", null );
    }

    if ( !req.body.password ) {
      return sendResponse( res, "passpoint", false, "Password is missing", null );
    }

    return signInProcedure( req.body.emailAddress, req.body.password, req )
      .then(( signedInUser: dataModel.core.user.Super ) => {

        return sendResponse( res, "passpoint", true, null, null );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "passpoint", false, "User not found", null );
        }

        if ( reason.identifier && reason.identifier == "NotVerified" ) {
          return sendResponse( res, "passpoint", false, "User not verified", null );
        }

        if ( reason.identifier && reason.identifier == "InvalidPassword" ) {
          return sendResponse( res, "passpoint", false, "Incorrect password", null );
        }

        return sendResponse( res, "passpoint", false, null, null );

      } );

  }

  /*********************************************************/

  function signOut ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    return signOutOfSession( req )
      .then(( response: void ) => {

        return sendResponse( res, "passpoint", true, null, null );

      } )
      .catch(( reason: any ) => {

        return sendResponse( res, "passpoint", false, null, null );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/