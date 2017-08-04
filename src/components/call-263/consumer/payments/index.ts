/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/call-263/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Payments implements consumerInterfaces.Payments {

  private readonly emitter: consumerInterfaces.payments.Emitter;

  constructor( params: consumerInterfaces.payments.Params ) {
    this.emitter = params.emitter;
  }

  get = (): Promise<any> => {
    return Promise.resolve();
  }

  getOne = (): Promise<any> => {
    return Promise.resolve();
  }

  makePayment = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Payments => {
  return new Payments( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

