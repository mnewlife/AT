/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as developerInterfaces from "../../../../interfaces/tasks/core/developer";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as communicationInterfaces from "../../../../interfaces/components/communication";
import * as authenticationInterfaces from "../../../../interfaces/components/authentication";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Registration implements developerInterfaces.Registration {

  constructor(
    private readonly emitter: developerInterfaces.auth.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUsers: storageInterfaces.core.user.Get,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly addUser: storageInterfaces.core.user.Add,
    private readonly updateUserById: storageInterfaces.core.user.UpdateById,
    private readonly generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
    private readonly createHash: authenticationInterfaces.CreateHashedPassword
  ) { }

  addAdmin = ( emailAddress: string, password: string, req: express.Request, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Admin> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {
          if ( password.length < 6 ) {
            return reject( {
              identifier: "ShortPassword",
              data: {}
            } );
          }
          resolve();
        } );

      } )
      .then(( response: any ) => {

        return this.getUsers( { emailAddress: emailAddress }, null, null );

      } )
      .then(( usersWithSameEmailAddress: interfaces.dataModel.core.user.Super[] ) => {

        return new Promise<void>(( resolve, reject ) => {
          if ( usersWithSameEmailAddress.length ) {
            return reject( {
              identifier: "EmailAddressInUse",
              data: {}
            } );
          }
          resolve();
        } );

      } )
      .then(( response: any ) => {

        return this.createHash( password );

      } )
      .then(( hashedPassword: string ) => {

        return Promise.all( [
          this.generateRandomNumber( 1543, 9812 ),
          this.generateRandomNumber( 5123, 7623 )
        ] )
          .then(( randomNumbers: number[] ) => {

            return Promise.resolve( {
              hashedPassword: hashedPassword,
              verificationCode: String( randomNumbers[ 0 ] ) + String( randomNumbers[ 1 ] )
            } );

          } );

      } )
      .then(( response: { hashedPassword: string; verificationCode: string } ) => {

        return this.addUser( {
          emailAddress: emailAddress,
          password: response.hashedPassword,
          accessLevel: "admin",
          verification: {
            verified: false,
            verificationCode: response.verificationCode,
            numVerAttempts: 0
          },
          activeApps: [ "Core" ]
        } );

      } )
      .then(( addedUser: interfaces.dataModel.core.user.Super ) => {

        return Promise.resolve( addedUser as interfaces.dataModel.core.user.Admin );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "ShortPassword" ) {
          return Promise.reject( {
            identifier: "ShortPassoword",
            data: {}
          } );
        }

        if ( reason && reason.identifier === "EmailAddressInUse" ) {
          return Promise.reject( {
            identifier: "EmailAddressInUse",
            data: {}
          } )
        }

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

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
  getUsers: storageInterfaces.core.user.Get,
  getUserById: storageInterfaces.core.user.GetById,
  addUser: storageInterfaces.core.user.Add,
  updateUserById: storageInterfaces.core.user.UpdateById,
  generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
  createHash: authenticationInterfaces.CreateHashedPassword
} ): developerInterfaces.Registration => {
  return new Registration(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getUsers,
    params.getUserById,
    params.addUser,
    params.updateUserById,
    params.generateRandomNumber,
    params.createHash
  )
}

/******************************************************************************/

