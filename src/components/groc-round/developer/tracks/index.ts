/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/groc-round/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class TrackProducts implements developerInterfaces.TrackProducts {

  private readonly emitter: developerInterfaces.trackProducts.Emitter;

  constructor( params: developerInterfaces.trackProducts.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.TrackProducts => {
  return new TrackProducts( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

