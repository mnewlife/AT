/******************************************************************************/

import * as core from "../../../../interfaces/components/core";

import * as auth from "./auth";
import * as profile from "./profile";
import * as registration from "./registration";

import * as admins from "./admins";

/******************************************************************************/

export { auth, profile, registration, admins };

/******************************************************************************/

export interface Params {
  auth: Auth;
  profile: Profile;
  registration: Registration;
  admins: Admins;
}

export interface Admins {
  get: admins.Get;
  getOne: admins.GetOne;
  add: admins.Add;
  remove: admins.Remove;
}

export interface Auth {
  signIn: auth.SignIn;
  signOut: auth.SignOut;
}

export interface Profile {
  readonly getUserDetails: profile.GetDetails;
  readonly updateUserDetails: profile.UpdateDetails;
  readonly changeEmailAddress: profile.ChangeEmailAddress;
  readonly changePassword: profile.ChangePassword;
  readonly requestPasswordResetCode: profile.RequestPasswordResetCode;
  readonly resetPassword: profile.ResetPassword;
  readonly deleteAccount: profile.DeleteAccount;
}

export interface Registration {
  verifyAccount: registration.VerifyAccount;
}

/******************************************************************************/
