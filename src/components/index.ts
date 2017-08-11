/******************************************************************************/

import * as interfaces from "../interfaces";

import sharedLogicFactory from "./shared-logic";
import sessionFactory from "./session";
import storageFactory from "./storage";
import authenticationFactory from "./authentication";
import communicationFactory from "./communication";
import responseFactory from "./response";

/******************************************************************************/

class Components implements interfaces.Components {

  [ index: string ]: Components[ keyof Components ];

  constructor(
    readonly sharedLogic: interfaces.components.SharedLogic,
    readonly session: interfaces.components.Session,
    readonly storage: interfaces.components.Storage,
    readonly authentication: interfaces.components.Authentication,
    readonly communication: interfaces.components.Communication,
    readonly response: interfaces.components.Response
  ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.Components => {

  return new Components(
    sharedLogicFactory( config.eventManager.emit ),
    sessionFactory( {
      emitEvent: config.eventManager.emit,
      production: config.environment.production,
      checkThrow: config.components.sharedLogic.moders.checkThrow
    } ),
    storageFactory( config ),
    authenticationFactory( {
      emit: config.eventManager.emit,
      getUserFromStorage: config.components.storage.core.user.get,
      getUserByIdFromStorage: config.components.storage.core.user.getById,
      setCurrentUserInSession: config.components.session.setCurrentUser,
      getCurrentUserFromSession: config.components.session.getCurrentUser,
      signOutOfSession: config.components.session.signOut,
      checkThrow: config.components.sharedLogic.moders.checkThrow
    } ),
    communicationFactory( config ),
    responseFactory( config.eventManager.emit )
  );

};

/******************************************************************************/
