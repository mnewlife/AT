/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
  context: "MailAgent";
}

/******************************************************************************/

export interface EmailSentData {
  from: string;
  to: string[];
  subject: string;
  html: string;
};
export interface EmailSent extends BaseEvent {
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
export interface SendEmailFailed extends BaseEvent {
  identifier: "SendEmailFailed";
  data: SendEmailFailedData;
}

/******************************************************************************/
