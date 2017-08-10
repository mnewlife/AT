/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as events from "./events";

import * as sharedLogic from "../../../interfaces/utilities/shared-logic";
import * as storageManager from "../../../interfaces/utilities/storage-manager";
import * as sessionManager from "../../../interfaces/utilities/session-manager";

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

  getUserFromStorage: storageManager.user.Get;
  getUserByIdFromStorage: storageManager.user.GetById;

  setCurrentUserInSession: sessionManager.SetCurrentUser;
  getCurrentUserFromSession: sessionManager.GetCurrentUser;
  signOutOfSession: sessionManager.SignOut;

  checkThrow: sharedLogic.moders.CheckThrow;
}

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface AuthPassword {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface CreateHashedPassword {
  ( password: string, forceThrow?: boolean ): Promise<string>;
}

/******************************************************************************/
