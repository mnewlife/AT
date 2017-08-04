/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/groc-round/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Tracks implements consumerInterfaces.Tracks {

  private readonly emitter: consumerInterfaces.tracks.Emitter;

  constructor( params: consumerInterfaces.tracks.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Tracks => {
  return new Tracks( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

