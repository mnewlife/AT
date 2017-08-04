/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../interfaces/components/core/index";

import authFactory from "./auth/index";
import profileFactory from "./profile/index";
import registrationFactory from "./registration/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Consumer implements coreInterfaces.Consumer {

  readonly auth: coreInterfaces.consumer.Auth;
  readonly profile: coreInterfaces.consumer.Profile;
  readonly registration: coreInterfaces.consumer.Registration;

  constructor( params: coreInterfaces.consumer.Params ) {
    this.auth = params.auth;
    this.profile = params.profile;
    this.registration = params.registration;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: coreInterfaces.SharedCode ): coreInterfaces.Consumer => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Consumer( {
    auth: authFactory( config.eventManager.emit, localSharedCode ),
    profile: profileFactory( config.eventManager.emit, localSharedCode ),
    registration: registrationFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

