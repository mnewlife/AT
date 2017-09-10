/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../data-model";
import * as components from "../../components/interfaces";
import * as storage from "../storage/interfaces";
import * as moders from "../helpers/moders/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface Instance extends components.MiddlewareBorn {
  readonly signedIn: SignedIn;
  readonly setCurrentUser: SetCurrentUser;
  readonly getCurrentUser: GetCurrentUser;
  readonly signOut: SignOut;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    getUserById: storage.core.user.Instance[ "getById" ],
    production: boolean
  ): Instance;
}

/******************************************************************************/

export interface SignedIn {
  ( req: express.Request ): boolean;
}

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
