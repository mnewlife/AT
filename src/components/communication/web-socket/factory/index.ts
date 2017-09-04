/******************************************************************************/

import * as http from "http";

import * as storageSub from "../../../storage/interfaces/core/subscription";
import * as moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  WebSocket: interfaces.Constructor,
  events: events.ClassInstance,
  checkThrow: moders.CheckThrow,
  getSubs: storageSub.ClassInstance[ "get" ],
  production: boolean,
  httpServer: http.Server
): interfaces.ClassInstance => {

  return new WebSocket( events, checkThrow, getSubs, production, httpServer );

}

/******************************************************************************/
