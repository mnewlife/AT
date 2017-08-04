/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as adminInterfaces from "../../../../interfaces/components/call-263/admin/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Channels implements adminInterfaces.Channels {

  private readonly emitter: adminInterfaces.channels.Emitter;

  constructor( params: adminInterfaces.channels.Params ) {
    this.emitter = params.emitter;
  }

  get = (): Promise<any> => {
    return Promise.resolve();
  }

  getOne = (): Promise<any> => {
    return Promise.resolve();
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

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.Channels => {
  return new Channels( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

