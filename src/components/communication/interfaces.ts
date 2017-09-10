/******************************************************************************/

import * as components from "../../components/interfaces";
import * as mailAgent from "./mail-agent/interfaces";
import * as webSocket from "./web-socket/interfaces";

/******************************************************************************/

export interface Instance extends components.MiddlewareBorn {
  readonly mailAgent: mailAgent.Instance;
  readonly webSocket: webSocket.Instance;
}

/******************************************************************************/