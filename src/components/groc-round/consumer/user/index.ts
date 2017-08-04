/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Auth implements consumerInterfaces.Auth {

  private readonly emitter: consumerInterfaces.auth.Emitter;

  constructor( params: consumerInterfaces.auth.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Auth => {
  return new Auth( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

