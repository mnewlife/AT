/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
  emailSent: ( params: events.EmailSentData ) => events.EmailSent;
  sendEmailFailed: ( params: events.SendEmailFailedData ) => events.SendEmailFailed;
}

export interface Params {
  emitter: Emitter;
  checkThrow: interfaces.components.sharedLogic.moders.CheckThrow;
  commSettings: interfaces.components.communication.CommSettings;
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
