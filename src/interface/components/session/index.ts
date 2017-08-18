/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
  setCurrentUser: ( params: events.SetCurrentUserData ) => events.SetCurrentUser;
  setCurrentUserFailed: ( params: events.SetCurrentUserFailedData ) => events.SetCurrentUserFailed;
  noCurrentUser: ( params: events.NoCurrentUserData ) => events.NoCurrentUser;
  getCurrentUserFailed: ( params: events.GetCurrentUserFailedData ) => events.GetCurrentUserFailed;
  signOutFailed: ( params: events.SignOutFailedData ) => events.SignOutFailed;
}

export interface Params {
  production: boolean;
  middlewareConfiguration: express.RequestHandler;
  getUserById: src.components.storage.core.user.GetById;
  events: Events;
  checkThrow: src.components.sharedLogic.moders.CheckThrow;
}

export interface SetCurrentUser {
  ( signedInUser: dataModel.core.user.Super, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
