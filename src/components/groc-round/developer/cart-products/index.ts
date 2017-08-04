/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/groc-round/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Carts implements developerInterfaces.Carts {

  private readonly emitter: developerInterfaces.carts.Emitter;

  constructor( params: developerInterfaces.carts.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Carts => {
  return new Carts( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

