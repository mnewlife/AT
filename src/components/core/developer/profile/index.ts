/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager/index";
import * as developerInterfaces from "../../../../interfaces/components/core/developer/index";

import emitterFactory from "./event-emitter/index";

/******************************************************************************/

class Profile implements developerInterfaces.Profile {

  private readonly emitter: developerInterfaces.profile.Emitter;

  constructor( params: developerInterfaces.profile.Params ) {
    this.emitter = params.emitter;
  }

  getUserDetails = (): Promise<any> => {
    return Promise.resolve();
  }

  updateUserDetails = (): Promise<any> => {
    return Promise.resolve();
  }

  changePassword = (): Promise<any> => {
    return Promise.resolve();
  }

}

/******************************************************************************/

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: developerInterfaces.SharedCode ): developerInterfaces.Profile => {
  return new Profile( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

