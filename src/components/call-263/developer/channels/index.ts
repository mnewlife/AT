/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/call-263/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Channels implements developerInterfaces.Channels {

  private readonly emitter: developerInterfaces.channels.Emitter;

  constructor( params: developerInterfaces.channels.Params ) {
    this.emitter = params.emitter;
  }

  add = (): Promise<any> => {
    return Promise.resolve();
  }

  update = (): Promise<any> => {
    return Promise.resolve();
  }

  delete = (): Promise<any> => {
    return Promise.resolve();
  }

  get = (): Promise<any> => {
    return Promise.resolve();
  }

  getOne = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Channels => {
  return new Channels( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

