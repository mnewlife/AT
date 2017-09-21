/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as profileShared from "../profile-shared/interfaces";

/******************************************************************************/

export default (
  getRequestCode: profileShared.RequestPasswordResetCode,
  getResetWord: profileShared.ResetPassword
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/requestPasswordResetCode/:emailAddress", getRequestCode() );
  router.get( "/resetPassword/:userId/:resetCode", getResetWord() );

  return router;

}

/******************************************************************************/