/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as coreInterfaces from "../../../src/procedures/core";

import authFactory from "./auth";
import profileFactory from "./profile";
import registrationFactory from "./registration";

/******************************************************************************/

class Admin implements coreInterfaces.Admin {
  constructor(
    readonly auth: coreInterfaces.admin.Auth,
    readonly profile: coreInterfaces.admin.Profile,
    readonly registration: coreInterfaces.admin.Registration
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): coreInterfaces.Admin => {
  return new Admin( authFactory( {
    emitEvent: config.eventManager.emit,
    authSignIn: config.components.authentication.signIn,
    authSignOut: config.components.authentication.signOut,
    generateRandomNumber: config.components.sharedLogic.numbers.generateRandomNumber,
    checkThrow: config.components.sharedLogic.moders.checkThrow
  } ),
  profileFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getUserById: config.components.storage.core.user.getById,
    updateUserById: config.components.storage.core.user.updateById,
    removeUserById: config.components.storage.core.user.removeById,
    sendEmail: config.components.communication.mailAgent.sendEmail,
    authPassword: config.components.authentication.authPassword
  } ),
  registrationFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getUserById: config.components.storage.core.user.getById,
    updateUserById: config.components.storage.core.user.updateById    
  } ) );
}

/******************************************************************************/