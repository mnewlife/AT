/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as coreInterfaces from "../../../interfaces/components/core";

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
    authSignIn: config.utilities.authenticationManager.signIn,
    authSignOut: config.utilities.authenticationManager.signOut,
    generateRandomNumber: config.utilities.sharedLogic.numbers.generateRandomNumber,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow
  } ),
  profileFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getUserById: config.utilities.storageManager.core.user.getById,
    updateUserById: config.utilities.storageManager.core.user.updateById,
    removeUserById: config.utilities.storageManager.core.user.removeById,
    sendEmail: config.utilities.communicationManager.mailAgent.sendEmail,
    authPassword: config.utilities.authenticationManager.authPassword
  } ),
  registrationFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getUserById: config.utilities.storageManager.core.user.getById,
    addUser: config.utilities.storageManager.core.user.add,
    updateUserById: config.utilities.storageManager.core.user.updateById    
  } ) );
}

/******************************************************************************/