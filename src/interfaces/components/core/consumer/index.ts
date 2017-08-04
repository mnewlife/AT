/******************************************************************************/

import * as auth from "./auth/index";
import * as profile from "./profile/index";
import * as registration from "./registration/index";

import * as sharedCode from "./shared-code/index";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export { auth, profile, registration, sharedCode };

/******************************************************************************/

export interface Params {
  auth: Auth;
  profile: Profile;
  registration : Registration;
}

export interface Auth {
  readonly signIn: interfaces.components.core.consumer.auth.SignIn;
  readonly signOut: interfaces.components.core.consumer.auth.SignOut;
}

export interface Profile {
  readonly getDetails: interfaces.components.core.consumer.profile.GetDetails;
  readonly UpdateDetails: interfaces.components.core.consumer.profile.UpdateDetails;
  readonly changeEmailAddress: interfaces.components.core.consumer.profile.ChangeEmailAddress;
  readonly changePassword: interfaces.components.core.consumer.profile.ChangePassword;
  readonly requestPasswordResetCode: interfaces.components.core.consumer.profile.RequestPasswordResetCode;
  readonly deleteAccount: interfaces.components.core.consumer.profile.DeleteAccount;

}

export interface Registration {
  readonly signUp: interfaces.components.core.consumer.registration.SignUp;
  readonly verification: interfaces.components.core.consumer.registration.Verification;
}

export interface SharedCode {
  verification: sharedCode.Verification;
}

/******************************************************************************/
