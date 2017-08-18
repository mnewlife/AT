/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
  emailSent: ( params: events.EmailSentData ) => events.EmailSent;
  sendEmailFailed: ( params: events.SendEmailFailedData ) => events.SendEmailFailed;
}

export interface Params {
  events: Events;
  checkThrow: src.components.sharedLogic.moders.CheckThrow;
  commSettings: src.components.communication.CommSettings;
}

export interface SendEmail {
  ( from: string, to: string[], subject: string, html: string, forceThrow?: boolean ): Promise<void>;
}

export interface MailOptions {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

/******************************************************************************/
