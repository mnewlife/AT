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
  readonly signIn: auth.SignIn;
  readonly signOut: auth.SignOut;
}

export interface Profile {
  readonly getUserDetails: profile.GetDetails;
  readonly updateUserDetails: profile.UpdateDetails;
  readonly changePassword: profile.ChangePassword;
}

export interface Registration {
  readonly addAdmin: registration.AddAdmin;
  readonly verifyAccount: registration.VerifyAccount;
}

export interface SharedCode {
  verification: sharedCode.Verification;
}

/******************************************************************************/
