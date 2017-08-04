/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../interfaces/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "SessionManager";

/******************************************************************************/

export interface SetCurrentUserData {
  user: dataImplementations.UserModel,
  req: express.Request
};
export interface SetCurrentUser extends Happening {
  context: context;
  identifier: "SetCurrentUser";
  data: SetCurrentUserData;
}

export interface SetCurrentUserFailedData {
  user: dataImplementations.UserModel,
  req: express.Request,
  reason: any
};
export interface SetCurrentUserFailed extends Happening {
  context: context,
  identifier: "SetCurrentUserFailed",
  data: SetCurrentUserFailedData;
}

export interface NoCurrentUserData {
  req: express.Request
};
export interface NoCurrentUser extends Happening {
  context: context,
  identifier: "NoCurrentUser",
  data: NoCurrentUserData;
}

export interface GetCurrentUserFailedData {
  req: express.Request,
  reason: any
};
export interface GetCurrentUserFailed extends Happening {
  context: context,
  identifier: "GetCurrentUserFailed",
  data: GetCurrentUserFailedData;
}

export interface SignOutFailedData {
  req: express.Request,
  reason: any
};
export interface SignOutFailed extends Happening {
  context: context,
  identifier: "SignOutFailed",
  data: SignOutFailedData;
}

/******************************************************************************/
