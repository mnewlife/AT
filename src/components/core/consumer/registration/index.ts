/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as communicationManagerInterfaces from "../../../../interfaces/utilities/communication-manager";
import * as authenticationManagerInterfaces from "../../../../interfaces/utilities/authentication-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Registration implements consumerInterfaces.Registration {

  constructor(
    private readonly emitter: consumerInterfaces.auth.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUserById: storageManagerInterfaces.core.user.GetById,
    private readonly updateUserById: storageManagerInterfaces.core.user.UpdateById
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
  getUserById: storageManagerInterfaces.core.user.GetById,
  updateUserById: storageManagerInterfaces.core.user.UpdateById,
} ): consumerInterfaces.Registration => {
  return new Registration(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getUserById,
    params.updateUserById
  )
}

/******************************************************************************/

