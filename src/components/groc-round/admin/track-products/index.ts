/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class TrackProducts implements adminInterfaces.TrackProducts {

  private readonly emitter: adminInterfaces.trackProducts.Emitter;

  constructor( params: adminInterfaces.trackProducts.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.TrackProducts => {
  return new TrackProducts( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

