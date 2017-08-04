/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/core/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Registration implements adminInterfaces.Registration {

  private readonly emitter: adminInterfaces.registration.Emitter;

  constructor( params: adminInterfaces.registration.Params ) {
    this.emitter = params.emitter;
  }

  addAdmin = (): Promise<any> => {
    return Promise.resolve();
  }

  verifyAccount = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.Registration => {
  return new Registration( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

