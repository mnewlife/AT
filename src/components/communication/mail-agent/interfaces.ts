/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";

import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new(
    events: events.Instance,
    checkThrow: moders.CheckThrow,
    sendingAddress: string,
    password: string
  ): Instance;
}

export interface Instance {
  readonly sendEmail: SendEmail;
}

export interface SendEmail {
  ( from: string, to: string[], subject: string, html: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/