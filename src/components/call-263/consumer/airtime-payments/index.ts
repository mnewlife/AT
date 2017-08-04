/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Profile implements consumerInterfaces.Profile {

  private readonly emitter: consumerInterfaces.profile.Emitter;

  constructor( params: consumerInterfaces.profile.Params ) {
    this.emitter = params.emitter;
  }

  getDetails = (): Promise<any> => {
    return Promise.resolve();
  }

  UpdateDetails = (): Promise<any> => {
    return Promise.resolve();
  }

  changeEmailAddress = (): Promise<any> => {
    return Promise.resolve();
  }

  changePassword = (): Promise<any> => {
    return Promise.resolve();
  }

  requestPasswordResetCode = (): Promise<any> => {
    return Promise.resolve();
  }

  deleteAccount = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: consumerInterfaces.SharedCode ): consumerInterfaces.Profile => {
  return new Profile( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

