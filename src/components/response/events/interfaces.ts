/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): Instance;
}

export interface Instance {
  readonly stringifyHtmlPacketFailed: ( data: StringifyHtmlPacketFailedData ) => StringifyHtmlPacketFailed;
  readonly unacceptableResponseType: ( data: UnacceptableResponseTypeData ) => UnacceptableResponseType;
  readonly sendResponseFailed: ( data: SendResponseFailedData ) => SendResponseFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "Response";
}

/******************************************************************************/

export interface StringifyHtmlPacketFailed extends BaseEvent {
  identifier: "StringifyHtmlPacketFailed";
  data: StringifyHtmlPacketFailedData;
}
export interface StringifyHtmlPacketFailedData {
  packet: {
    success: boolean;
    message: string;
    payload: any;
  };
  reason: any;
};

/******************************************************************************/

export interface UnacceptableResponseType extends BaseEvent {
  identifier: "UnacceptableResponseType";
  data: UnacceptableResponseTypeData;
}
export interface UnacceptableResponseTypeData {
  res: express.Response,
  packet: {
    view: string;
    success: boolean;
    message: string;
    payload: any;   
  }
};

/******************************************************************************/

export interface SendResponseFailed extends BaseEvent {
  identifier: "SendResponseFailed",
  data: SendResponseFailedData;
}
export interface SendResponseFailedData {
  res: express.Response,
  view: string,
  success: boolean,
  message: string,
  payload: any,
  reason: any
};

/******************************************************************************/