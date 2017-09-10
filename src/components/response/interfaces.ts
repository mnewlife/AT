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
  readonly send: Send;
}

/******************************************************************************/

export interface Constructor {
  new( events: events.Instance ): Instance;
}

/******************************************************************************/

export interface Send {
  ( res: express.Response, view: string, success: boolean, message: string, payload: any ): void;
}

/******************************************************************************/
