/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as storageManager from "../../../interfaces/utilities/storage-manager/index";
import * as sessionManager from "../../../interfaces/utilities/session-manager/index";
import * as sharedLogic from "../../../interfaces/utilities/shared-logic/index";
import * as events from "../../../interfaces/events/utilities/authentication-manager/index";

import * as dataImplementations from "../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  signedIn: ( params: events.SignedInData ) => events.SignedIn;
  signInFailed: ( params: events.SignInFailedData ) => events.SignInFailed;
  invalidPassword: ( params: events.InvalidPasswordData ) => events.InvalidPassword;
  signedOut: ( params: events.SignedOutData ) => events.SignedOut;
  signOutFailed: ( params: events.SignOutFailedData ) => events.SignOutFailed;
  getCurrentUserFailed: ( params: events.GetCurrentUserFailedData ) => events.GetCurrentUserFailed;
  createHashedPasswordFailed: ( params: events.CreateHashedPasswordFailedData ) => events.CreateHashedPasswordFailed;
  authPasswordFailed: ( params: events.AuthPasswordFailedData ) => events.AuthPasswordFailed;
}

export interface Params {
  emitter: Emitter;

  storageGetUser: storageManager.user.Get;
  storageGetUserById: storageManager.user.GetById;

  sessionSetCurrentUser: sessionManager.SetCurrentUser;
  sessionGetCurrentUser: sessionManager.GetCurrentUser;
  sessionSignOut: sessionManager.SignOut;

  checkThrow: sharedLogic.moders.CheckThrow;
}

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<any>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface AuthPassword {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<any>;
}

export interface CreateHashedPassword {
  ( password: string, forceThrow?: boolean ): Promise<any>;
}

/******************************************************************************/
