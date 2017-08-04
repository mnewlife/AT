/******************************************************************************/

import * as core from "../../../../interfaces/components/core/index";

import * as auth from "./auth/index";
import * as profile from "./profile/index";
import * as registration from "./registration/index";

import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { auth, profile, registration, sharedCode };

/******************************************************************************/

export interface Params {
  auth: Auth;
  profile: Profile;
  registration: Registration;
}

export interface Auth {
  signIn: auth.SignIn;
  signOut: auth.SignOut;
}

export interface Profile {
  getUserDetails: profile.GetDetails;
  updateUserDetails: profile.UpdateDetails;
  changePassword: profile.ChangePassword;
}

export interface Registration {
  addAdmin: registration.AddAdmin;
  verifyAccount: registration.VerifyAccount;
}

export interface SharedCode {
  verification: sharedCode.Verification;
}

/******************************************************************************/
