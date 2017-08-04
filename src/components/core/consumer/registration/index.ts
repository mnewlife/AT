/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Registration implements consumerInterfaces.Registration {

  private readonly emitter: consumerInterfaces.registration.Emitter;

  constructor( params: consumerInterfaces.registration.Params ) {
    this.emitter = params.emitter;
  }

  signUp = (): Promise<any> => {
    return Promise.resolve();
  }

  verification = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Registration => {
  return new Registration( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

