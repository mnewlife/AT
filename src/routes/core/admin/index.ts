/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";
import * as authProcedures from "../../../procedures/core/common/auth/interfaces";
import * as profileShared from "../profile-shared/interfaces";

import profile from "./profile";
//import registration from "./registration";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: helpers.Instance,
  makeProfileHandlers: profileShared.Instance
): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.use( "/profile", profile(
    makeProfileHandlers.getDetails,
    makeProfileHandlers.updateDetails,
    makeProfileHandlers.changeEmailAddress,
    makeProfileHandlers.changePassword,
    makeProfileHandlers.deleteAccount,
    helpers.getAuthCheck
  ) );

  /**********************************************************/

  router.get( "/", helpers.getAuthCheck( "admin", "core-admin" ),
    ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      return components.response.send( res, "core-admin", true, null, {
        currentUser: res.locals.currentUser
      } );

    } );

  /**********************************************************/

  return router;

}

/******************************************************************************/