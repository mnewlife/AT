/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Tracks implements adminInterfaces.Tracks {

  private readonly emitter: adminInterfaces.tracks.Emitter;

  constructor( params: adminInterfaces.tracks.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.Tracks => {
  return new Tracks( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

