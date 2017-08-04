/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/call-263/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class AirtimeTransfers implements developerInterfaces.AirtimeTransfers {

  private readonly emitter: developerInterfaces.airtimeTransfers.Emitter;

  constructor( params: developerInterfaces.airtimeTransfers.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

