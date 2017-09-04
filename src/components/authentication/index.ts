/******************************************************************************/

import * as eventListener from "../../event-listener/interfaces";
import * as moders from "../helpers/moders/interfaces";
import * as session from "../session/interfaces";
import * as storageUser from "../storage/interfaces/core/user";

import * as interfaces from "./interfaces";

import Canon from "./canon";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  getUsers: storageUser.ClassInstance[ "get" ],
  getUserById: storageUser.ClassInstance[ "getById" ],
  setUserInSession: session.SetCurrentUser,
  getUserFromSession: session.GetCurrentUser,
  signOutOfSession: session.SignOut
): interfaces.ClassInstance => {

  return factory(
    Canon,
    new Events( emitEvent ),
    checkThrow,
    getUsers,
    getUserById,
    setUserInSession,
    getUserFromSession,
    signOutOfSession
  );

}

/******************************************************************************/


/******************************************************************************/
