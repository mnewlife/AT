/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "MailAgent";

/******************************************************************************/

export interface EmailSentData {
  from: string;
  to: string[];
  subject: string;
  html: string;
};
export interface EmailSent extends Happening {
  context: context;
  identifier: "EmailSent";
  data: EmailSentData;
}

/******************************************************************************/

export interface SendEmailFailedData {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reason: any
};
export interface SendEmailFailed extends Happening {
  context: context;
  identifier: "SendEmailFailed";
  data: SendEmailFailedData;
}

/******************************************************************************/
