
/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";
import * as session from "../../session/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  Authentication: interfaces.Constructor,
  events: events.ClassInstance,
  checkThrow: moders.CheckThrow,
  getUsers: storageUser.ClassInstance[ "get" ],
  getUserById: storageUser.ClassInstance[ "getById" ],
  setUserInSession: session.SetCurrentUser,
  getUserFromSession: session.GetCurrentUser,
  signOutOfSession: session.SignOut
): interfaces.ClassInstance => {

  return new Authentication(
    events,
    checkThrow,
    getUsers,
    getUserById,
    setUserInSession,
    getUserFromSession,
    signOutOfSession
  );

}

/******************************************************************************/

