/******************************************************************************/

import * as express from "express";
import * as src from "../../../../src";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Session";
}

/******************************************************************************/

export interface SetCurrentUserData {
  user: dataModel.core.user.Super,
  req: express.Request
};
export interface SetCurrentUser extends BaseEvent {
  identifier: "SetCurrentUser";
  data: SetCurrentUserData;
}

/******************************************************************************/

export interface SetCurrentUserFailedData {
  user: dataModel.core.user.Super,
  req: express.Request,
  reason: any
};
export interface SetCurrentUserFailed extends BaseEvent {
  identifier: "SetCurrentUserFailed",
  data: SetCurrentUserFailedData;
}

/******************************************************************************/

export interface NoCurrentUserData {
  req: express.Request
};
export interface NoCurrentUser extends BaseEvent {
  identifier: "NoCurrentUser",
  data: NoCurrentUserData;
}

/******************************************************************************/

export interface GetCurrentUserFailedData {
  req: express.Request,
  reason: any
};
export interface GetCurrentUserFailed extends BaseEvent {
  identifier: "GetCurrentUserFailed",
  data: GetCurrentUserFailedData;
}

/******************************************************************************/

export interface SignOutFailedData {
  req: express.Request,
  reason: any
};
export interface SignOutFailed extends BaseEvent {
  identifier: "SignOutFailed",
  data: SignOutFailedData;
}

/******************************************************************************/
