/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as authentication from "../../../../components/authentication/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";
import * as helpers from "../helpers/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface Instance {
  readonly signIn: SignIn;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    cleanUsers: helpers.CleanUsers,
    authSignIn: authentication.SignIn
  ): Instance;
}

/******************************************************************************/

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

/******************************************************************************/