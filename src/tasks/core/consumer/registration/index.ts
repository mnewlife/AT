/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/tasks/core/consumer";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as communicationInterfaces from "../../../../interfaces/components/communication";
import * as authenticationInterfaces from "../../../../interfaces/components/authentication";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Registration implements consumerInterfaces.Registration {

  constructor(
    private readonly emitter: consumerInterfaces.auth.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly updateUserById: storageInterfaces.core.user.UpdateById
  ) { }

  verifyAccount = ( userId: string, code: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<void>(( resolve, reject ) => {
          if ( foundUser.verification.verificationCode == code ) {
            resolve();
          } else {
            reject();
          }
        } );

      } )
      .then(( response: any ) => {

        return this.updateUserById( userId, {
          verification: {
            verified: true,
            verificationCode: code
          }
        } );

      } )
      .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "VerifyAccountFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  getUserById: storageInterfaces.core.user.GetById,
  updateUserById: storageInterfaces.core.user.UpdateById,
} ): consumerInterfaces.Registration => {
  return new Registration(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getUserById,
    params.updateUserById
  )
}

/******************************************************************************/

