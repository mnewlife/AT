/******************************************************************************/

import * as interfaces from "../../interfaces";
import * as eventManagerInterfaces from "../../interfaces/setup-config/event-manager";

import * as authenticationInterfaces from "../../interfaces/components/authentication";
import * as storageInterfaces from "../../interfaces/components/storage";
import * as sessionInterfaces from "../../interfaces/components/session";
import * as sharedLogicInterfaces from "../../interfaces/components/shared-logic";

import basicAuthenticationFactory from "./basic";

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

): interfaces.components.Authentication => {
  return basicAuthenticationFactory( params );
}

/******************************************************************************/
