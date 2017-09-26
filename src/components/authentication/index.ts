/******************************************************************************/

import * as eventListener from "../../event-listener/interfaces";
import * as moders from "../helpers/moders/interfaces";
import * as session from "../session/interfaces";
import * as storageUser from "../storage/interfaces/core/user";
import * as helpers from "../../procedures/core/common/helpers/interfaces";

import * as interfaces from "./interfaces";

import Helpers from "../../procedures/core/common/helpers";

import Canon from "./canon";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  getUsers: storageUser.Instance[ "get" ],
  getUserById: storageUser.Instance[ "getById" ],
  setUserInSession: session.SetCurrentUser,
  getUserFromSession: session.GetCurrentUser,
  signOutOfSession: session.SignOut,
  cleanUsers: helpers.CleanUsers
): interfaces.Instance => {

  return factory(
    Canon,
    new Events( emitEvent ),
    checkThrow,
    getUsers,
    getUserById,
    setUserInSession,
    getUserFromSession,
    signOutOfSession,
    cleanUsers
  );

}

/******************************************************************************/


/******************************************************************************/
