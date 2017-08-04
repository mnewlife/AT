/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as consumerInterfaces from "../../../../interfaces/components/call-263/consumer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class AirtimeTransfers implements consumerInterfaces.AirtimeTransfers {

  private readonly emitter: consumerInterfaces.airtimeTransfers.Emitter;

  constructor( params: consumerInterfaces.airtimeTransfers.Params ) {
    this.emitter = params.emitter;
  }

  get = (): Promise<any> => {
    return Promise.resolve();
  }

  getOne = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

