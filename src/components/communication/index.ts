/******************************************************************************/

import * as http from "http";

import * as eventListener from "../../event-listener/interfaces";
import * as moders from "../helpers/moders/interfaces";
import * as storage from "../storage/interfaces";

import * as interfaces from "./interfaces";

import * as MailAgent from "./mail-agent/interfaces";
import * as WebSocket from "./web-socket/interfaces";

import mailAgent from "./mail-agent";
import webSocket from "./web-socket";

/******************************************************************************/

class Communication implements interfaces.Instance {

  constructor(
    readonly mailAgent: MailAgent.Instance,
    readonly webSocket: WebSocket.Instance
  ) { }

}

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  getSubById: any,
  production: boolean,
  httpServer: http.Server
): interfaces.Instance => {

  return new Communication(
    mailAgent( emitEvent, checkThrow, "allansimoyi@gmail.com", "passwordhere" ),
    webSocket( emitEvent, checkThrow, getSubById, production, httpServer )
  );
  
}

/******************************************************************************/
