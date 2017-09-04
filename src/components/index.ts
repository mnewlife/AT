/******************************************************************************/

import * as http from "http";

import * as eventListener from "../event-listener/interfaces";
import * as interfaces from "./interfaces";

import authentication from "./authentication";
import communication from "./communication";
import storage from "./storage";
import session from "./session";
import response from "./response";
import helpers from "./helpers";

/******************************************************************************/

class Components implements interfaces.Instance {

  constructor(
    public readonly helpers: interfaces.helpers.Instance,
    readonly storage: interfaces.storage.ClassInstance,
    readonly session: interfaces.session.ClassInstance,
    readonly authentication: interfaces.authentication.ClassInstance,
    readonly communication: interfaces.communication.Instance,
    readonly response: interfaces.response.ClassInstance
  ) { }

}

/******************************************************************************/

export default ( emitEvent: eventListener.Emit, production: boolean, httpServer: http.Server ): interfaces.Instance => {

  let helpersInstance = helpers( emitEvent );

  let storageInstance = storage(
    emitEvent,
    helpersInstance.dataStructures.mapDetails,
    helpersInstance.moders.checkThrow
  );

  let sessionInstance = session(
    emitEvent,
    helpersInstance.moders.checkThrow,
    storageInstance.core.user.getById,
    production
  );

  let authenticationInstance = authentication(
    emitEvent,
    helpersInstance.moders.checkThrow,
    storageInstance.core.user.get,
    storageInstance.core.user.getById,
    sessionInstance.setCurrentUser,
    sessionInstance.getCurrentUser,
    sessionInstance.signOut
  );

  let communicationInstance = communication(
    emitEvent,
    helpersInstance.moders.checkThrow,
    "",
    production,
    httpServer
  );

  let responseInstance = response( emitEvent );

  return new Components(
    helpersInstance,
    storageInstance,
    sessionInstance,
    authenticationInstance,
    communicationInstance,
    responseInstance
  );

};

/******************************************************************************/