
/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";
import * as session from "../../session/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  Authentication: interfaces.Constructor,
  events: events.Instance,
  checkThrow: moders.CheckThrow,
  getUsers: storageUser.Instance[ "get" ],
  getUserById: storageUser.Instance[ "getById" ],
  setUserInSession: session.SetCurrentUser,
  getUserFromSession: session.GetCurrentUser,
  signOutOfSession: session.SignOut
): interfaces.Instance => {

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

