/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly signedIn: ( data: SignedInData ) => SignedIn;
  readonly signInFailedData: ( data: SignInFailedData ) => SignInFailed;
  readonly invalidPassword: ( data: InvalidPasswordData ) => InvalidPassword;
  readonly signedOut: ( data: SignedOutData ) => SignedOut;
  readonly signOutFailed: ( data: SignOutFailedData ) => SignOutFailed;
  readonly getCurrentUserFailed: ( data: GetCurrentUserFailedData ) => GetCurrentUserFailed;
  readonly createHashedPassword: ( data: CreateHashedPasswordFailedData ) => CreateHashedPasswordFailed;
  readonly authPasswordFailed: ( data: AuthPasswordFailedData ) => AuthPasswordFailed;
}

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Authentication";
}

/******************************************************************************/

export interface SignedInData {
  user: dataModel.core.user.Super;
}
export interface SignedIn extends BaseEvent {
  identifier: "SignedIn";
  data: SignedInData;
}

/******************************************************************************/

export interface SignInFailedData {
  emailAddress: string;
  reason: any;
}
export interface SignInFailed extends BaseEvent {
  identifier: "SignInFailed";
  data: SignInFailedData;
}

/******************************************************************************/

export interface InvalidPasswordData {
  emailAddress?: string;
  userId?: string;
  password: string
}
export interface InvalidPassword extends BaseEvent {
  identifier: "InvalidPassword";
  data: InvalidPasswordData;
}

/******************************************************************************/

export interface SignedOutData {
  userId: string;
}
export interface SignedOut extends BaseEvent {
  identifier: "SignedOut";
  data: SignedOutData;
}

/******************************************************************************/

export interface SignOutFailedData {
  req: express.Request;
  reason: any;
}
export interface SignOutFailed extends BaseEvent {
  identifier: "SignOutFailed";
  data: SignOutFailedData;
}

/******************************************************************************/

export interface GetCurrentUserFailedData {
  req: express.Request;
  reason: any;
}
export interface GetCurrentUserFailed extends BaseEvent {
  identifier: "GetCurrentUserFailed";
  data: GetCurrentUserFailedData;
}

/******************************************************************************/

export interface CreateHashedPasswordFailedData {
  password: string;
  reason: any;
}
export interface CreateHashedPasswordFailed extends BaseEvent {
  identifier: "CreateHashedPasswordFailed";
  data: CreateHashedPasswordFailedData;
}

/******************************************************************************/

export interface AuthPasswordFailedData {
  userId: string;
  password: string;
  reason: any;
};
export interface AuthPasswordFailed extends BaseEvent {
  identifier: "AuthPasswordFailed";
  data: AuthPasswordFailedData;
}

/******************************************************************************/