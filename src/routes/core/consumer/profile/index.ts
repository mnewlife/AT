/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../../data-model";
import * as root from "../../../../interfaces";

import * as helpers from "../../../helpers/interfaces";
import * as profileShared from "../../profile-shared/interfaces";

/******************************************************************************/

export default (
  makeGetDetails: profileShared.GetDetails,
  makeUpdateDetails: profileShared.UpdateDetails,
  makeChangeEmailAddress: profileShared.ChangeEmailAddress,
  makeChangePassword: profileShared.ChangePassword,
  makeDeleteAccount: profileShared.DeleteAccount,
  getAuthCheck: helpers.GetAuthCheck
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  let accessLevel: dataModel.core.user.AccessLevel = "admin";
  let appContext: root.CoreView = "core-admin";

  router.get(
    "/getDetails",
    getAuthCheck( "consumer", "core-consumer", "get-details" ),
    makeGetDetails( appContext )
  );

  router.post(
    "/updateDetails",
    getAuthCheck( "consumer", "core-consumer", "update-details" ),
    makeUpdateDetails( appContext )
  );

  router.post(
    "/changeEmailAddress",
    getAuthCheck( "consumer", "core-consumer", "change-email-address" ),
    makeChangeEmailAddress( appContext )
  );

  router.post(
    "/changePassword",
    getAuthCheck( "consumer", "core-consumer", "change-password" ),
    makeChangePassword( appContext )
  );

  router.get(
    "/deleteAccount",
    getAuthCheck( "consumer", "core-consumer", "delete-account" ),
    makeDeleteAccount( appContext )
  );

  /*********************************************************/

  return router;

}

/******************************************************************************/