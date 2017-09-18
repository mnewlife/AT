/******************************************************************************/

import * as express from "express";

import * as EventListener from "../../event-listener/interfaces";
import * as Components from "../../components/interfaces";
import * as Procedures from "../../procedures/interfaces";

import * as Helpers from "../helpers/interfaces";

import auth from "./auth";
import profile from "./profile";
import registration from "./registration";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: Helpers.Instance
): express.Router => {

  let router = express.Router();

  router.use( "/auth", auth(
    procedures.core.common.auth.signIn,
    helpers.setViewContexts,
    components.response.send
  ) );

  router.use( "/profile", profile(
    procedures.core.common.profile.getUserDetails,
    procedures.core.common.profile.updateUserDetails,
    procedures.core.common.profile.changeEmailAddress,
    procedures.core.common.profile.changePassword,
    procedures.core.common.profile.requestPasswordResetCode,
    procedures.core.common.profile.resetPassword,
    helpers.setViewContexts,
    components.response.send
  ) );

  router.use( "/registration", registration(
    procedures.core.common.registration.verifyAccount,
    components.response.send
  ) );

  //router.use( "/developer", developer( config ) );
  //router.use( "/admin", admin( eventListener, components, procedures, helpers ) );
  //router.use( "/consumer", consumer( config ) );

  return router;

}

/******************************************************************************/