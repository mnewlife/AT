/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/call-263/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Channel implements consumerInterfaces.Channel {

  private readonly emitter: consumerInterfaces.channel.Emitter;

  constructor( params: consumerInterfaces.channel.Params ) {
    this.emitter = params.emitter;
  }

  getDetails = (): Promise<any> => {
    return Promise.resolve();
  }

  getBalances = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Channel => {
  return new Channel( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

