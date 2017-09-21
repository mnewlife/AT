/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as root from "../../interfaces";
import * as dataModel from "../../data-model";
import * as interfaces from "../../interfaces";

/******************************************************************************/

export interface Instance {
  readonly validateAppContext: ValidateAppContext;
  readonly getAuthCheck: GetAuthCheck;
}

/******************************************************************************/

export interface ValidateAppContext {
  ( appContext: string ): boolean;
}

export interface GetAuthCheck {
  ( accessLevel: dataModel.core.user.AccessLevel, appContext?: root.View, innerContext?: string ): express.RequestHandler;
}

/******************************************************************************/
