/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as events from "../../../interfaces/events/utilities/session-manager/index";

import * as dataImplementations from "../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  setCurrentUser: ( params: events.SetCurrentUserData ) => events.SetCurrentUser;
  setCurrentUserFailed: ( params: events.SetCurrentUserFailedData ) => events.SetCurrentUserFailed;
  noCurrentUser: ( params: events.NoCurrentUserData ) => events.NoCurrentUser;
  getCurrentUserFailed: ( params: events.GetCurrentUserFailedData ) => events.GetCurrentUserFailed;
  signOutFailed: ( params: events.SignOutFailedData ) => events.SignOutFailed;
}

export interface Params {
  production: boolean;
  middlewareConfiguration: express.RequestHandler;
  emitter: Emitter;
  checkThrow: interfaces.utilities.sharedLogic.moders.CheckThrow;
}

export interface SetCurrentUser {
  ( signedInUser: interfaces.dataModel.User, req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
