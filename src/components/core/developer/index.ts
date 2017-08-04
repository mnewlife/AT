/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../interfaces/components/core/index";

import authFactory from "./auth/index";
import profileFactory from "./profile/index";
import registrationFactory from "./registration/index";

import sharedCodeFactory from "./shared-code/index";

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

