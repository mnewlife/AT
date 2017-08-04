/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "ResponseManager";

/******************************************************************************/

export interface StringifyHtmlPacketFailedData {
  packet: any;
  reason: any;
};
export interface StringifyHtmlPacketFailed extends Happening {
  context: context;
  identifier: "StringifyHtmlPacketFailed";
  data: StringifyHtmlPacketFailedData;
}

export interface UnacceptableResponseTypeData {
  res: express.Response;
  packet: {
    view: string;
    success: boolean;
    message: string;
    payload?: any;
  };
};
export interface UnacceptableResponseType extends Happening {
  context: context;
  identifier: "UnacceptableResponseType";
  data: UnacceptableResponseTypeData;
}

export interface SendResponseFailedData {
  res: express.Response,
  view: string,
  success: boolean,
  message: string,
  payload?: any,
  reason: any
};
export interface SendResponseFailed extends Happening {
  context: context;
  identifier: "SendResponseFailed";
  data: SendResponseFailedData;
}

/******************************************************************************/
