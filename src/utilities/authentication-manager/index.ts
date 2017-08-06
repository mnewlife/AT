/******************************************************************************/

import * as interfaces from "../../interfaces";
import * as eventManagerInterfaces from "../../interfaces/setup-config/event-manager";
import * as storageManagerInterfaces from "../../interfaces/utilities/storage-manager";
import * as sessionManagerInterfaces from "../../interfaces/utilities/session-manager";
import * as sharedLogicInterfaces from "../../interfaces/utilities/shared-logic";

import basicAuthenticationManagerFactory from "./basic";

/******************************************************************************/

export default ( params: {
  emit: eventManagerInterfaces.Emit;
  getUserFromStorage: storageManagerInterfaces.core.user.Get;
  getUserByIdFromStorage: storageManagerInterfaces.core.user.GetById,
  setCurrentUserInSession: sessionManagerInterfaces.SetCurrentUser;
  getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;
  signOutOfSession: sessionManagerInterfaces.SignOut;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow
} ): interfaces.utilities.AuthenticationManager => {
  return basicAuthenticationManagerFactory( params );
}

/******************************************************************************/
