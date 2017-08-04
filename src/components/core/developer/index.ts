/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as coreInterfaces from "../../../interfaces/components/core";

import authFactory from "./auth";
import profileFactory from "./profile";
import registrationFactory from "./registration";

import sharedCodeFactory from "./shared-code";

/******************************************************************************/

class Developer implements coreInterfaces.Developer {

  readonly auth: coreInterfaces.developer.Auth;
  readonly profile: coreInterfaces.developer.Profile;
  readonly registration: coreInterfaces.developer.Registration;

  constructor( params: coreInterfaces.developer.Params ) {
    this.auth = params.auth;
    this.profile = params.profile;
    this.registration = params.registration;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: coreInterfaces.SharedCode ): coreInterfaces.Developer => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Developer( {
    auth: authFactory( config.eventManager.emit, localSharedCode ),
    profile: profileFactory( config.eventManager.emit, localSharedCode ),
    registration: registrationFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

