/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as events from "./events";

import * as authentication from "../../../interfaces/components/authentication";
import * as storage from "../../../interfaces/components/storage";
import * as session from "../../../interfaces/components/session";

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

export interface Constructor {
  new(

    emitter: Emitter,

    getUserFromStorage: storage.core.user.Get,
    getUserByIdFromStorage: storage.core.user.GetById,
    
    setCurrentUserInSession: session.SetCurrentUser,
    getCurrentUserFromSession: session.GetCurrentUser,
    signOutOfSession: session.SignOut,
    
    checkThrow: interfaces.tasks.moders.CheckThrow

  ): interfaces.components.Authentication;
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
