/******************************************************************************/

import * as mailAgent from "./mail-agent/interfaces";
import * as webSocket from "./web-socket/interfaces";

/******************************************************************************/

export interface Instance {
  readonly mailAgent: mailAgent.ClassInstance;
  readonly webSocket: webSocket.ClassInstance;
}

/******************************************************************************/