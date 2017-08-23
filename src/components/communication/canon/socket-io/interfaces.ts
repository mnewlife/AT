/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../src";
import * as events from "./events";

import * as storage from "../storage/interfaces";
import * as session from "../session/interfaces";

/******************************************************************************/

export interface Events {
  signedIn: ( params: events.SignedInData ) => events.SignedIn;
  signInFailed: ( params: events.SignInFailedData ) => events.SignInFailed;

  invalidPassword: ( params: events.InvalidPasswordData ) => events.InvalidPassword;

  signedOut: ( params: events.SignedOutData ) => events.SignedOut;
  signOutFailed: ( params: events.SignOutFailedData ) => events.SignOutFailed;
  
  getCurrentUserFailed: ( params: events.GetCurrentUserFailedData ) => events.GetCurrentUserFailed;
  createHashedPasswordFailed: ( params: events.CreateHashedPasswordFailedData ) => events.CreateHashedPasswordFailed;
  authPasswordFailed: ( params: events.AuthPasswordFailedData ) => events.AuthPasswordFailed;
}

/******************************************************************************/

export interface Constructor {
  new(

    events: Events,
    checkThrow: src.procedures.moders.CheckThrow,

    getUser: storage.core.user.Get,
    getUserById: storage.core.user.GetById,

    setCurrentUser: session.SetCurrentUser,
    getCurrentUser: session.GetCurrentUser,
    signOut: session.SignOut

  ): src.components.Authentication;
}

/******************************************************************************/

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface AuthPassword {
  ( userId: string, password: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface CreateHashedPassword {
  ( password: string, forceThrow?: boolean ): Promise<string>;
}

/******************************************************************************/
