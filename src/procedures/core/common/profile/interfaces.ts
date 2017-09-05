/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as authentication from "../../../../components/authentication/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export interface ClassInstance {
  readonly signIn: SignIn;
}

/******************************************************************************/

export interface Constructor {
  new(
    events: events.ClassInstance,
    checkThrow: moders.CheckThrow,
    authSignIn: authentication.SignIn
  ): ClassInstance;
}

/******************************************************************************/

export interface SignIn {
  ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

/******************************************************************************/