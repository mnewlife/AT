/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as response from "../../../components/response/interfaces";
import * as registrationProcedures from "../../../procedures/core/common/registration/interfaces";

/******************************************************************************/

export default (
  verifyAccountProcedure: registrationProcedures.VerifyAccount,
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  /*********************************************************/

  router.get( "/verifyAccount/:userId/:code", verifyAccount );

  /*********************************************************/

  function verifyAccount ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext = "verify-account";

    if ( !req.params.userId ) {
      return sendResponse( res, "passpoint", false, "UserID is missing", { innerContext: innerContext } );
    }

    if ( !req.params.code ) {
      return sendResponse( res, "passpoint", false, "Verification code is missing", { innerContext: innerContext } );
    }

    return verifyAccountProcedure( req.params.userId, req.params.code )
      .then(( response: any ) => {

        return sendResponse( res, "passpoint", true, "Verification successful, sign in with your email address", { innerContext: innerContext } );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "DocumentNotFound" ) {
          return sendResponse( res, "passpoint", false, "User not found", { innerContext: innerContext } );
        }

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "passpoint", false, "User not found", { innerContext: innerContext } );
        }

        if ( reason.identifier && reason.identifier == "InvalidCode" ) {
          return sendResponse( res, "passpoint", false, "Invalid Verification Code", { innerContext: innerContext } );
        }

        return sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/
