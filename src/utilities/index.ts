/******************************************************************************/

import * as interfaces from "../interfaces";

import sharedLogicFactory from "./shared-logic";
import sessionManagerFactory from "./session-manager";
import storageManagerFactory from "./storage-manager";
import authenticationManagerFactory from "./authentication-manager";
import communicationManagerFactory from "./communication-manager";
import responseManagerFactory from "./response-manager";

/******************************************************************************/

class Utilities implements interfaces.Utilities {

  readonly sharedLogic: interfaces.utilities.SharedLogic;
  readonly sessionManager: interfaces.utilities.SessionManager;
  readonly storageManager: interfaces.utilities.StorageManager;
  readonly authenticationManager: interfaces.utilities.AuthenticationManager;
  readonly communicationManager: interfaces.utilities.CommunicationManager;
  readonly responseManager: interfaces.utilities.ResponseManager;

  constructor( config: interfaces.Config, params: {
    sharedLogic: interfaces.utilities.SharedLogic;
    sessionManager: interfaces.utilities.SessionManager;
    storageManager: interfaces.utilities.StorageManager;
    authenticationManager: interfaces.utilities.AuthenticationManager;
    communicationManager: interfaces.utilities.CommunicationManager;
    responseManager: interfaces.utilities.ResponseManager;
  } ) {
    this.sharedLogic = params.sharedLogic;
    this.sessionManager = params.sessionManager;
    this.storageManager = params.storageManager;
    this.authenticationManager = params.authenticationManager;
    this.communicationManager = params.communicationManager;
    this.responseManager = params.responseManager;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.Utilities => {
  const params = {
    sharedLogic: sharedLogicFactory( config.eventManager.emit ),
    sessionManager: sessionManagerFactory( {
      emitEvent: config.eventManager.emit,
      production: config.environment.production,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow
    } ),
    storageManager: storageManagerFactory( config ),
    authenticationManager: authenticationManagerFactory( {
      emit: config.eventManager.emit,
      getUserFromStorage: config.utilities.storageManager.user.get,
      getUserByIdFromStorage: config.utilities.storageManager.user.getById,
      setCurrentUserInSession: config.utilities.sessionManager.setCurrentUser,
      getCurrentUserFromSession: config.utilities.sessionManager.getCurrentUser,
      signOutOfSession: config.utilities.sessionManager.signOut,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow
    } ),
    communicationManager: communicationManagerFactory( config ),
    responseManager: responseManagerFactory( config.eventManager.emit )
  };
  return new Utilities( config, params );
};

/******************************************************************************/
