/******************************************************************************/

import * as express from "express";

import * as EventListener from "../../event-listener/interfaces";
import * as Components from "../../components/interfaces";
import * as Procedures from "../../procedures/interfaces";

import * as Helpers from "../helpers/interfaces";

import auth from "./auth";
import profile from "./profile";
import registration from "./registration";
import ProfileShared from "./profile-shared";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: Helpers.Instance
): express.Router => {

  let router = express.Router();

  let makeProfileHandlers = new ProfileShared(
    procedures.core.common.profile.getUserDetails,
    procedures.core.common.profile.updateUserDetails,
    procedures.core.common.profile.changeEmailAddress,
    procedures.core.common.profile.changePassword,
    procedures.core.common.profile.requestPasswordResetCode,
    procedures.core.common.profile.resetPassword,
    procedures.core.common.profile.deleteAccount,
    components.helpers.numbers.generateRandomNumber,
    components.session.signedIn,
    components.session.getUserId,
    components.response.send
  );

  router.use( "/auth", auth(
    procedures.core.common.auth.signIn,
    components.session.signOut,
    helpers.validateAppContext,
    components.response.send
  ) );

  router.use( "/profile", profile(
    makeProfileHandlers.requestPasswordResetCode,
    makeProfileHandlers.resetPassword
  ) );

  router.use( "/registration", registration(
    procedures.core.common.registration.verifyAccount,
    components.response.send
  ) );

  //router.use( "/developer", developer( config ) );
  router.use( "/admin", admin( components, procedures, helpers, makeProfileHandlers ) );
  router.use( "/consumer", consumer( components, procedures, helpers ) );

  return router;

}

/******************************************************************************/