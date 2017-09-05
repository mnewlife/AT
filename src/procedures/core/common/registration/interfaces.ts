/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/core/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as communicationInterfaces from "../../../../src/components/communication";
import * as authenticationInterfaces from "../../../../src/components/authentication";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Registration implements adminInterfaces.Registration {

  constructor(
    private readonly events: adminInterfaces.auth.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly updateUserById: storageInterfaces.core.user.UpdateById
  ) { }

  verifyAccount = ( userId: string, code: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: dataModel.core.user.Super ) => {

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
      .then(( updatedUser: dataModel.core.user.Super ) => {

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
  updateUserById: storageInterfaces.core.user.UpdateById
} ): adminInterfaces.Registration => {
  return new Registration(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getUserById,
    params.updateUserById
  )
}

/******************************************************************************/

