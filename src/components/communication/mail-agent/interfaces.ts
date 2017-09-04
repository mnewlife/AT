/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";

import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new(
    events: events.ClassInstance,
    checkThrow: moders.CheckThrow,
    sendingAddress: string,
    password: string
  ): ClassInstance;
}

export interface ClassInstance {
  readonly sendEmail: SendEmail;
}

export interface SendEmail {
  ( from: string, to: string[], subject: string, html: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/