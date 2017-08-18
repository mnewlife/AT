/******************************************************************************/

import * as IEventListener from "../event-listener/interfaces";

import * as interfaces from "./interfaces";

import authentication from "./authentication";
import communication from "./communication";
import storage from "./storage";
import session from "./session";
import response from "./response";
import helpers from "./helpers";

/******************************************************************************/

class Components implements interfaces.Components {

  [ index: string ]: Components[ keyof Components ];

  constructor(
    readonly helpers: interfaces.Helpers,
    readonly session: interfaces.Session,
    readonly storage: interfaces.Storage,
    readonly authentication: interfaces.Authentication,
    readonly communication: interfaces.Communication,
    readonly response: interfaces.Response
  ) { }

}

/******************************************************************************/

export default ( emitEvent: IEventListener.Emit, production: boolean ): interfaces.Components => {

  let helpersInstance = helpers( emitEvent );
  let storageInstance = storage( emitEvent );
  let sessionInstance = session( emitEvent, production, helpersInstance.moders.checkThrow );
  let authenticationInstance = authentication( emitEvent );
  let communicationInstance = communication( emitEvent );
  let responseInstance = response( emitEvent );

  return new Components(
    helpersInstance, storageInstance, sessionInstance, 
    authenticationInstance, communicationInstance, responseInstance
  );

};

/******************************************************************************/
