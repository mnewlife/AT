/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/groc-round/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class DeliveryFees implements developerInterfaces.DeliveryFees {

  private readonly emitter: developerInterfaces.deliveryFees.Emitter;

  constructor( params: developerInterfaces.deliveryFees.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.DeliveryFees => {
  return new DeliveryFees( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

