/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";

import * as authentication from "../../../components/authentication/interfaces";
import * as storage from "../../../components/storage/interfaces";

import mongodb from "../mongodb";

/******************************************************************************/

export default (

  authenticationClass: string,

  emit: eventListener.Emit,
  getUserFromStorage: storage.core.user.Get,
  getUserByIdFromStorage: storage.core.user.GetById,
  setCurrentUserInSession: session.SetCurrentUser,
  getCurrentUserFromSession: session.GetCurrentUser,
  signOutOfSession: session.SignOut,
  checkThrow: helpers.moders.CheckThrow

): src.components.Authentication => {
  return canonAuthenticationFactory( params );
}

/******************************************************************************/
