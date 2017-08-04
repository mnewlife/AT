/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/groc-round/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class TrackProducts implements consumerInterfaces.TrackProducts {

  private readonly emitter: consumerInterfaces.trackProducts.Emitter;

  constructor( params: consumerInterfaces.trackProducts.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.TrackProducts => {
  return new TrackProducts( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

