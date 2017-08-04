/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/groc-round/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class DeliveryFees implements consumerInterfaces.DeliveryFees {

  private readonly emitter: consumerInterfaces.deliveryFees.Emitter;

  constructor( params: consumerInterfaces.deliveryFees.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.DeliveryFees => {
  return new DeliveryFees( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

