/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as coreInterfaces from "../../../interfaces/components/core";

import adminsFactory from "./admins";
import logisticsFactory from "./logistics";
import salesRepsFactory from "./sales-reps";

import authFactory from "./auth";
import profileFactory from "./profile";
import registrationFactory from "./registration";

/******************************************************************************/

class Admin implements coreInterfaces.Admin {

  readonly admins: coreInterfaces.admin.Admins;
  readonly logistics: coreInterfaces.admin.Admins;
  readonly salesReps: coreInterfaces.admin.SalesReps;

  readonly auth: coreInterfaces.admin.Auth;
  readonly profile: coreInterfaces.admin.Profile;
  readonly registration: coreInterfaces.admin.Registration;

  constructor( params: {
    auth: coreInterfaces.admin.Auth,
    profile: coreInterfaces.admin.Profile,
    registration: coreInterfaces.admin.Registration
  } ) {
    this.auth = params.auth;
    this.profile = params.profile;
    this.registration = params.registration;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): coreInterfaces.Admin => {
  return new Admin( {
    admins: adminsFactory( {} ),
    logistics: logisticsFactory( {} ),
    salesReps: salesRepsFactory( {} ),
    auth: authFactory( {
      emitEvent: config.eventManager.emit,
      authSignIn: config.utilities.authenticationManager.signIn,
      authSignOut: config.utilities.authenticationManager.signOut,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow
    } ),
    profile: profileFactory( config.eventManager.emit ),
    registration: registrationFactory( {
      emitEvent: config.eventManager.emit,
      storeNewUser: config.utilities.storageManager.user.add,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      getCurrentUserFromSession: config.utilities.sessionManager.getCurrentUser
    } )
  } );
}

/******************************************************************************/

