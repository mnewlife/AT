/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer/index";

import emitterFactory from "./event-emitter/index";

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

