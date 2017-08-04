/******************************************************************************/

import * as auth from "./auth";
import * as profile from "./profile";
import * as registration from "./registration";

import * as admins from "./admins";
import * as logistics from "./logistics";
import * as salesReps from "./sales-reps";

/******************************************************************************/

export { admins, logistics, salesReps };
export { auth, profile, registration };

/******************************************************************************/

export interface Admins {
  readonly get: admins.Get;
  readonly getOne: admins.GetOne;
  readonly add: admins.Add;
  readonly remove: admins.Remove;
}

export interface Logistics {
  readonly get: admins.Get;
  readonly getOne: admins.GetOne;
  readonly add: admins.Add;
  readonly remove: admins.Remove;
}

export interface SalesReps {
  readonly get: admins.Get;
  readonly getOne: admins.GetOne;
  readonly add: admins.Add;
  readonly remove: admins.Remove;
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
