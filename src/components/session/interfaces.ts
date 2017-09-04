/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../data-model";
import * as storage from "../storage/interfaces";
import * as moders from "../helpers/moders/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface ClassInstance {
  readonly setCurrentUser: SetCurrentUser;
  readonly getCurrentUser: GetCurrentUser;
  readonly signOut: SignOut;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.ClassInstance,
    checkThrow: moders.CheckThrow,
    getUserById: storage.core.user.ClassInstance[ "getById" ],
    production: boolean
  ): ClassInstance;
}

/******************************************************************************/

export interface SetCurrentUser {
  ( userId: string, req: express.Request, forceThrow?: boolean ): Promise<void>;
}

export interface GetCurrentUser {
  ( req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface SignOut {
  ( req: express.Request, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
