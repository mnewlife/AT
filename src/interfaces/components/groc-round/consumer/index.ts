/******************************************************************************/

import * as auth from "./auth";
import * as profile from "./profile";
import * as registration from "./registration";

/******************************************************************************/

export { auth, profile, registration };

/******************************************************************************/

export interface Params {
  auth: Auth;
  profile: Profile;
  registration : Registration;
}

export interface Auth {
  readonly signIn: auth.SignIn;
  readonly signOut: auth.SignOut;
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
  readonly verifyAccount: registration.VerifyAccount;
}

/******************************************************************************/
