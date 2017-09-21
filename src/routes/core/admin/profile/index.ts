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
    getAuthCheck( "admin", "core-admin", "get-details" ),
    makeGetDetails( appContext )
  );

  router.post(
    "/updateDetails/:userId",
    getAuthCheck( "admin", "core-admin", "update-details" ),
    makeUpdateDetails( appContext )
  );

  router.post(
    "/changeEmailAddress/:userId",
    getAuthCheck( "admin", "core-admin", "change-email-address" ),
    makeChangeEmailAddress( appContext )
  );

  router.post(
    "/changePassword/:userId",
    getAuthCheck( "admin", "core-admin", "change-password" ),
    makeChangePassword( appContext )
  );

  router.get(
    "/deleteAccount/:userId",
    getAuthCheck( "admin", "core-admin", "delete-account" ),
    makeDeleteAccount( appContext )
  );

  /*********************************************************/

  return router;

}

/******************************************************************************/