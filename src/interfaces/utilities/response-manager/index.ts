/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces";
import * as events from "./events";
import * as storageManager from "../../../interfaces/utilities/storage-manager";
import * as sessionManager from "../../../interfaces/utilities/session-manager";
import * as sharedLogic from "../../../interfaces/utilities/shared-logic";

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
