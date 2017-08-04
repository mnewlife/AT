/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as coreInterfaces from "../../../interfaces/components/core/index";

import authFactory from "./auth/index";
import profileFactory from "./profile/index";
import registrationFactory from "./registration/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Admin implements coreInterfaces.Admin {

  readonly auth: coreInterfaces.admin.Auth;
  readonly profile: coreInterfaces.admin.Profile;
  readonly registration: coreInterfaces.admin.Registration;

  constructor( params: coreInterfaces.admin.Params ) {
    this.auth = params.auth;
    this.profile = params.profile;
    this.registration = params.registration;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: coreInterfaces.SharedCode ): coreInterfaces.Admin => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Admin( {
    auth: authFactory( {
      emitEvent: config.eventManager.emit,
      authSignIn: config.utilities.authenticationManager.signIn,
      authSignOut: config.utilities.authenticationManager.signOut,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      sharedCode: localSharedCode
    } ),
    profile: profileFactory( config.eventManager.emit, localSharedCode ),
    registration: registrationFactory( {
      emitEvent: config.eventManager.emit,
      storeNewUser: config.utilities.storageManager.user.add,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      getCurrentUserFromSession: config.utilities.sessionManager.getCurrentUser,
      sharedCode: localSharedCode
    } )
  } );
}

/******************************************************************************/

