/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/core/admin";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Profile implements adminInterfaces.Profile {

  private readonly emitter: adminInterfaces.profile.Emitter;

  constructor( params: adminInterfaces.profile.Params ) {
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

export default ( emitEvent: eventManagerInterfaces.Emit, sharedCode: adminInterfaces.SharedCode ): adminInterfaces.Profile => {
  return new Profile( {
    emitter: emitterFactory( emitEvent )
  } )
}

/******************************************************************************/

