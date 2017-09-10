/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";
import * as authProcedures from "../../../procedures/core/common/auth/interfaces";

import auth from "./auth";
//import profile from "./profile";
//import registration from "./registration";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: helpers.Instance
): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.use( "/auth", auth(
    procedures.core.common.auth.signIn,
    helpers.setViewContexts,
    components.response.send
  ) );

  // router.use( "/profile", authCheck, profile() ) -- use authCheck, not for registration

  /**********************************************************/

  router.get( "/", authCheck, ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    return components.response.send( res, "core-admin", true, null, {
      currentUser: res.locals.currentUser
    } );

  } );

  /**********************************************************/

  function authCheck ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !components.session.signedIn( req ) ) {
      return signInFirst();
    }

    return components.session.getCurrentUser( req )
      .then(( currentUser: dataModel.core.user.Super ) => {

        if ( currentUser.accessLevel == "admin" ) {
          res.locals.currentUser = currentUser;
          return next();
        } else {
          return signInFirst();
        }

      } );

    function signInFirst () {
      return components.response.send( res, "passpoint-admin", false, "You need to sign in first", null );
    }

  }

  /**********************************************************/

  return router;

}

/******************************************************************************/