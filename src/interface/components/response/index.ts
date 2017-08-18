/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../src";
import * as events from "./events";
import * as storage from "../../../src/components/storage";
import * as session from "../../../src/components/session";
import * as sharedLogic from "../../../src/components/shared-logic";

/******************************************************************************/

export interface Events {
  stringifyHtmlPacketFailed: ( params: events.StringifyHtmlPacketFailedData ) => events.StringifyHtmlPacketFailed;
  unacceptableResponseType: ( params: events.UnacceptableResponseTypeData ) => events.UnacceptableResponseType;
  sendResponseFailed: ( params: events.SendResponseFailedData ) => events.SendResponseFailed;
}

export interface Params {
  events: Events
}

export interface Send {
  ( res: express.Response, view: string, success: boolean, message: string, payload?: any ): void;
}

/******************************************************************************/
