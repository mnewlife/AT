/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as events from "./events";
import * as storage from "../../../interfaces/components/storage";
import * as session from "../../../interfaces/components/session";
import * as sharedLogic from "../../../interfaces/components/shared-logic";

/******************************************************************************/

export interface Emitter {
  stringifyHtmlPacketFailed: ( params: events.StringifyHtmlPacketFailedData ) => events.StringifyHtmlPacketFailed;
  unacceptableResponseType: ( params: events.UnacceptableResponseTypeData ) => events.UnacceptableResponseType;
  sendResponseFailed: ( params: events.SendResponseFailedData ) => events.SendResponseFailed;
}

export interface Params {
  emitter: Emitter
}

export interface Send {
  ( res: express.Response, view: string, success: boolean, message: string, payload?: any ): void;
}

/******************************************************************************/
