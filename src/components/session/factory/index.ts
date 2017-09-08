/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  Session: interfaces.Constructor,
  events: events.Instance,
  checkThrow: moders.CheckThrow,
  getUserById: storageUser.Instance[ "getById" ],
  production: boolean
): interfaces.Instance => {

  return new Session( events, checkThrow, getUserById, production );

}

/******************************************************************************/
