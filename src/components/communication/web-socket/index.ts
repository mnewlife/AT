/******************************************************************************/

import * as http from "http";

import * as eventListener from "../../../event-listener/interfaces";
import * as storageSub from "../../storage/interfaces/core/subscription";
import * as moders from "../../helpers/moders/interfaces";

import * as interfaces from "./interfaces";

import SocketIO from "./socket-io";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  getSubs: storageSub.ClassInstance[ "get" ],
  production: boolean,
  httpServer: http.Server
): interfaces.ClassInstance => {

  return factory( SocketIO, new Events( emitEvent ), checkThrow, getSubs, production, httpServer );

}

/******************************************************************************/
