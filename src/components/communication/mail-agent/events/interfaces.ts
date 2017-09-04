/******************************************************************************/

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly emailSent: ( data: EmailSentData ) => EmailSent;
  readonly sendEmailFailed: ( data: SendEmailFailedData ) => SendEmailFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "MailAgent";
}

/******************************************************************************/

export interface EmailSent extends BaseEvent {
  identifier: "EmailSent";
  data: EmailSentData;
}
export interface EmailSentData {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export interface SendEmailFailed extends BaseEvent {
  identifier: "SendEmailFailed";
  data: SendEmailFailedData;
}
export interface SendEmailFailedData {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reason: any;
}

/******************************************************************************/