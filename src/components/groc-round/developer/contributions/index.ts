/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/groc-round/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Contributions implements developerInterfaces.Contributions {

  private readonly emitter: developerInterfaces.contributions.Emitter;

  constructor( params: developerInterfaces.contributions.Params ) {
    this.emitter = params.emitter;
  }

  signIn = (): Promise<any> => {
    return Promise.resolve();
  }

  signOut = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Contributions => {
  return new Contributions( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

