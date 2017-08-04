/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class DeliveryFees implements adminInterfaces.DeliveryFees {

  private readonly emitter: adminInterfaces.deliveryFees.Emitter;

  constructor( params: adminInterfaces.deliveryFees.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.DeliveryFees => {
  return new DeliveryFees( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

