/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/call-263/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Payments implements adminInterfaces.Payments {

  private readonly emitter: adminInterfaces.payments.Emitter;

  constructor( params: adminInterfaces.payments.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.Payments => {
  return new Payments( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

