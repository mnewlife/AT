/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/call-263/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Payments implements developerInterfaces.Payments {

  private readonly emitter: developerInterfaces.payments.Emitter;

  constructor( params: developerInterfaces.payments.Params ) {
    this.emitter = params.emitter;
  }

  get = (): Promise<any> => {
    return Promise.resolve();
  }

  getOne = (): Promise<any> => {
    return Promise.resolve();
  }

  recordPayment = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Payments => {
  return new Payments( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

