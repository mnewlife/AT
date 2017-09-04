/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly setCurrentUser: ( data: SetCurrentUserData ) => SetCurrentUser;
  readonly setCurrentUserFailed: ( data: SetCurrentUserFailedData ) => SetCurrentUserFailed;
  readonly noCurrentUser: ( data: NoCurrentUserData ) => NoCurrentUser;
  readonly getCurrentUserFailed: ( data: GetCurrentUserFailedData ) => GetCurrentUserFailed;
  readonly signOutFailed: ( data: SignOutFailedData ) => SignOutFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "Session";
}

/******************************************************************************/

export interface SetCurrentUser extends BaseEvent {
  identifier: "SetCurrentUser";
  data: SetCurrentUserData;
}
export interface SetCurrentUserData {
  userId: string;
  req: express.Request;
};

/******************************************************************************/

export interface SetCurrentUserFailed extends BaseEvent {
  identifier: "SetCurrentUserFailed";
  data: SetCurrentUserFailedData;
}
export interface SetCurrentUserFailedData {
  userId: string,
  req: express.Request,
  reason: any
};

/******************************************************************************/

export interface NoCurrentUser extends BaseEvent {
  identifier: "NoCurrentUser",
  data: NoCurrentUserData;
}
export interface NoCurrentUserData {
  req: express.Request
};

/******************************************************************************/

export interface GetCurrentUserFailed extends BaseEvent {
  identifier: "GetCurrentUserFailed",
  data: GetCurrentUserFailedData;
}
export interface GetCurrentUserFailedData {
  req: express.Request,
  reason: any
};

/******************************************************************************/

export interface SignOutFailed extends BaseEvent {
  identifier: "SignOutFailed",
  data: SignOutFailedData;
}
export interface SignOutFailedData {
  req: express.Request,
  reason: any
};

/******************************************************************************/
