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

  router.post( "/verifyAccount/:userId/:code", verifyAccount );

  /*********************************************************/

  function verifyAccount ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !req.params.userId ) {
      return sendResponse( res, "passpoint", false, "", null );
    }

    if ( !req.params.code ) {
      return sendResponse( res, "passpoint", false, "", null );
    }

    return verifyAccountProcedure( req.params.userId, req.params.code )
      .then(( response: any ) => {

        return sendResponse( res, "passpoint", true, null, null );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "UserNotFound" ) {
          return sendResponse( res, "passpoint", false, "User not found", null );
        }

        if ( reason.identifier && reason.identifier == "InvalidCode" ) {
          return sendResponse( res, "passpoint", false, "Invalid Verification Code", null );
        }

        return sendResponse( res, "passpoint", false, null, null );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/
