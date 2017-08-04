/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../interfaces/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "AuthenticationManager";

/******************************************************************************/

export interface SignedInData {
  user: dataImplementations.UserModel;
}
export interface SignedIn extends Happening {
  context: context;
  identifier: "SignedIn";
  data: SignedInData;
}

export interface SignInFailedData {
  emailAddress: string;
  reason: any;
}
export interface SignInFailed extends Happening {
  context: context;
  identifier: "SignInFailed";
  data: SignInFailedData;
}

export interface InvalidPasswordData {
  emailAddress?: string;
  userId?: string;
  password: string
}
export interface InvalidPassword extends Happening {
  context: context;
  identifier: "InvalidPassword";
  data: InvalidPasswordData;
}

/******************************************************************************/

export interface SignedOutData {
  userId: string;
}
export interface SignedOut extends Happening {
  context: context;
  identifier: "SignedOut";
  data: SignedOutData;
}

export interface SignOutFailedData {
  req: express.Request;
  reason: any;
}
export interface SignOutFailed extends Happening {
  context: context;
  identifier: "SignOutFailed";
  data: SignOutFailedData;
}

/******************************************************************************/

export interface GetCurrentUserFailedData {
  req: express.Request;
  reason: any;
}
export interface GetCurrentUserFailed extends Happening {
  context: context;
  identifier: "GetCurrentUserFailed";
  data: GetCurrentUserFailedData;
}

/******************************************************************************/

export interface CreateHashedPasswordFailedData {
  password: string;
  reason: any;
}
export interface CreateHashedPasswordFailed extends Happening {
  context: context;
  identifier: "CreateHashedPasswordFailed";
  data: CreateHashedPasswordFailedData;
}

/******************************************************************************/

export interface AuthPasswordFailedData {
  userId: string;
  password: string;
  reason: any;
};
export interface AuthPasswordFailed extends Happening {
  context: context;
  identifier: "AuthPasswordFailed";
  data: AuthPasswordFailedData;
}

/******************************************************************************/
