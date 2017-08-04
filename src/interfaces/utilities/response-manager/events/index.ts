/******************************************************************************/

import * as express from "express";
import * as interfaces from "../../../../interfaces";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
  context: "ResponseManager";
}

/******************************************************************************/

export interface StringifyHtmlPacketFailedData {
  packet: any;
  reason: any;
};
export interface StringifyHtmlPacketFailed extends BaseEvent {
  identifier: "StringifyHtmlPacketFailed";
  data: StringifyHtmlPacketFailedData;
}

/******************************************************************************/

export interface UnacceptableResponseTypeData {
  res: express.Response;
  packet: {
    view: string;
    success: boolean;
    message: string;
    payload?: any;
  };
};
export interface UnacceptableResponseType extends BaseEvent {
  identifier: "UnacceptableResponseType";
  data: UnacceptableResponseTypeData;
}

/******************************************************************************/

export interface SendResponseFailedData {
  res: express.Response,
  view: string,
  success: boolean,
  message: string,
  payload?: any,
  reason: any
};
export interface SendResponseFailed extends BaseEvent {
  identifier: "SendResponseFailed";
  data: SendResponseFailedData;
}

/******************************************************************************/
