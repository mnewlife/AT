/******************************************************************************/

import * as http from "http";

import * as storageUser from "../../../storage/interfaces/core/user";
import * as moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  WebSocket: interfaces.Constructor,
  events: events.Instance,
  checkThrow: moders.CheckThrow,
  getUserById: storageUser.Instance[ "getById" ],
  production: boolean,
  httpServer: http.Server
): interfaces.Instance => {

  return new WebSocket( events, checkThrow, getUserById, production, httpServer );

}

/******************************************************************************/
