/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../interfaces/index";
import * as storageManager from "../../../interfaces/utilities/storage-manager/index";
import * as sessionManager from "../../../interfaces/utilities/session-manager/index";
import * as sharedLogic from "../../../interfaces/utilities/shared-logic/index";
import * as events from "../../../interfaces/events/utilities/response-manager/index";


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
