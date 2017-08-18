/******************************************************************************/

import * as src from "../../src";
import * as eventManagerInterfaces from "../../src/setup-config/event-manager";

import * as authenticationInterfaces from "../../src/components/authentication";
import * as storageInterfaces from "../../src/components/storage";
import * as sessionInterfaces from "../../src/components/session";

import canonAuthenticationFactory from "./canon";

/******************************************************************************/

export default (

  authenticationClass: string,

  emit: eventManagerInterfaces.Emit,
  getUserFromStorage: storageInterfaces.core.user.Get,
  getUserByIdFromStorage: storageInterfaces.core.user.GetById,
  setCurrentUserInSession: sessionInterfaces.SetCurrentUser,
  getCurrentUserFromSession: sessionInterfaces.GetCurrentUser,
  signOutOfSession: sessionInterfaces.SignOut,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow

): src.components.Authentication => {
  return canonAuthenticationFactory( params );
}

/******************************************************************************/
