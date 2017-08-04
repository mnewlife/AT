/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/core/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Auth implements developerInterfaces.Auth {

  private readonly emitter: developerInterfaces.auth.Emitter;

  constructor( params: developerInterfaces.auth.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Auth => {
  return new Auth( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

