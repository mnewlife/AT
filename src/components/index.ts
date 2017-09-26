/******************************************************************************/

import * as http from "http";

import * as eventListener from "../event-listener/interfaces";
import * as procHelpers from "../procedures/core/common/helpers/interfaces";
import * as interfaces from "./interfaces";

import Helpers from "../procedures/core/common/helpers";
import authentication from "./authentication";
import communication from "./communication";
import storage from "./storage";
import session from "./session";
import response from "./response";
import helpers from "./helpers";

/******************************************************************************/

class Components implements interfaces.Instance {

  constructor(
    readonly helpers: interfaces.helpers.Instance,
    readonly storage: interfaces.storage.Instance,
    readonly session: interfaces.session.Instance,
    readonly authentication: interfaces.authentication.Instance,
    readonly communication: interfaces.communication.Instance,
    readonly response: interfaces.response.Instance
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
    sessionInstance.signOut,
    new Helpers( helpersInstance.moders.checkThrow ).cleanUsers
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