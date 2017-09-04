/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  Session: interfaces.Constructor,
  events: events.ClassInstance,
  checkThrow: moders.CheckThrow,
  getUserById: storageUser.ClassInstance[ "getById" ],
  production: boolean
): interfaces.ClassInstance => {

  return new Session( events, checkThrow, getUserById, production );

}

/******************************************************************************/
