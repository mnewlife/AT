/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as coreInterfaces from "../../../interfaces/tasks/core";

import authFactory from "./auth";
import profileFactory from "./profile";
import registrationFactory from "./registration";

/******************************************************************************/

class Developer implements coreInterfaces.Developer {
  constructor(
    readonly auth: coreInterfaces.developer.Auth,
    readonly profile: coreInterfaces.developer.Profile,
    readonly registration: coreInterfaces.developer.Registration
  ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): coreInterfaces.Developer => {
  return new Developer( authFactory( {
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
    addUser: config.components.storage.core.user.add,
    updateUserById: config.components.storage.core.user.updateById    
  } ) );
}

/******************************************************************************/