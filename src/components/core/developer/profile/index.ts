/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as developerInterfaces from "../../../../interfaces/components/core/developer";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sessionManagerInterfaces from "../../../../interfaces/utilities/session-manager";
import * as communicationManagerInterfaces from "../../../../interfaces/utilities/communication-manager";
import * as authenticationManagerInterfaces from "../../../../interfaces/utilities/authentication-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Profile implements developerInterfaces.Profile {

  constructor(
    private readonly emitter: developerInterfaces.auth.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUserById: storageManagerInterfaces.core.user.GetById,
    private readonly updateUserById: storageManagerInterfaces.core.user.UpdateById,
    private readonly removeUserById: storageManagerInterfaces.core.user.RemoveById,
    private readonly sendEmail: communicationManagerInterfaces.mailAgent.SendEmail,
    private readonly authPassword: authenticationManagerInterfaces.AuthPassword,
    private readonly createHash: authenticationManagerInterfaces.CreateHashedPassword,
    private readonly signOutSession: sessionManagerInterfaces.SignOut,
    private readonly generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
    private readonly appName: string,
    private readonly host: string,
    private readonly sendingAddress: string
  ) { }

  getUserDetails = ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<interfaces.dataModel.core.user.Super>(( resolve, reject ) => {
          foundUser.password = "";
          if ( foundUser.resetCode ) {
            foundUser.resetCode = "";
          }
          if ( foundUser.verification.verificationCode ) {
            foundUser.verification.verificationCode = "";
          }
          resolve( foundUser );
        } );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetUserDetailsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  updateUserDetails = ( userId: string, details: storageManagerInterfaces.core.user.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.updateUserById( userId, details );

      } )
      .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<interfaces.dataModel.core.user.Super>(( resolve, reject ) => {
          updatedUser.password = "";
          if ( updatedUser.resetCode ) {
            updatedUser.resetCode = "";
          }
          if ( updatedUser.verification.verificationCode ) {
            updatedUser.verification.verificationCode = "";
          }
          resolve( updatedUser );
        } );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetUserDetailsFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  changeEmailAddress = ( userId: string, password: string, newEmailAddress: string, req: express.Request, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authPassword( userId, password );

      } )
      .then(( authenticatedUser: interfaces.dataModel.core.user.Super ) => {

        return Promise.all( [
          this.generateRandomNumber( 1543, 9812 ),
          this.generateRandomNumber( 5123, 7623 )
        ] )
          .then(( randomNumbers: number[] ) => {

            return Promise.resolve( String( randomNumbers[ 0 ] ) + String( randomNumbers[ 1 ] ) );

          } );

      } )
      .then(( verificationCode: string ) => {

        return this.updateUserById( userId, {
          emailAddress: newEmailAddress,
          verification: {
            verified: false,
            verificationCode: verificationCode
          }
        } )
          .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

            return Promise.resolve( verificationCode );

          } );

      } )
      .then(( verificationCode: string ) => {

        let html = [
          "<h3>Hey, " + newEmailAddress + "</h3>",
          "<br>",
          "<span>",
          "Thank you for joining the platform. Click the link below to verify your email address.",
          "</span>",
          "<br>",
          "<a href='" + this.host + "/core/developer/registration/verifyAccount/" + verificationCode + "'>",
          "Click here to activate your account",
          "</a>",
          "<br>",
          "<br>",
          "<span>",
          "Have questions? Get in touch with email our support team ( " + this.sendingAddress + " ).",
          "</span>",
          "<br>",
          "Cheers,",
          this.appName
        ].join();

        return this.sendEmail( this.sendingAddress, [ newEmailAddress ], this.appName + " | Account Verification", html );

      } )
      .then(( response: any ) => {

        if ( userId == req.session.currentUser.id ) {
          return this.signOutSession( req );
        } else {
          return Promise.resolve();
        }

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "ChangeEmailAddressFailed",
          data: {
            reason: reason
          }
        } );

      } );


  }

  changePassword = ( userId: string, oldPassword: string, newPassword: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authPassword( userId, oldPassword );

      } )
      .then(( authenticatedUser: interfaces.dataModel.core.user.Super ) => {

        return this.createHash( newPassword );

      } )
      .then(( hashedPassword: string ) => {

        return this.updateUserById( userId, {
          password: hashedPassword
        } );

      } )
      .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "ChangePasswordFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  requestPasswordResetCode = ( userId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return Promise.all( [
          this.generateRandomNumber( 1543, 9812 ),
          this.generateRandomNumber( 5123, 7623 )
        ] )
          .then(( randomNumbers: number[] ) => {

            return Promise.resolve( String( randomNumbers[ 0 ] ) + String( randomNumbers[ 1 ] ) );

          } );

      } )
      .then(( resetCode: string ) => {

        return this.updateUserById( userId, {
          resetCode: resetCode
        } )
          .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

            return Promise.resolve( {
              emailAddress: updatedUser.emailAddress,
              resetCode: resetCode
            } );

          } );

      } )
      .then(( response: { resetCode: string, emailAddress: string } ) => {

        let html = [
          "<h3>Hey, " + response.emailAddress + "</h3>",
          "<br>",
          "<span>",
          "Thank you for joining the platform. Click the link below to verify your email address.",
          "</span>",
          "<br>",
          "<a href='" + this.host + "/core/developer/profile/resetPassword/" + response.resetCode + "'>",
          "Click here to activate your account",
          "</a>",
          "<br>",
          "<br>",
          "<span>",
          "Have questions? Get in touch with email our support team ( " + this.sendingAddress + " ).",
          "</span>",
          "<br>",
          "Cheers,",
          this.appName
        ].join();

        return this.sendEmail( this.sendingAddress, [ response.emailAddress ], this.appName + " | Account Verification", html );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "ResetPasswordFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  resetPassword = ( userId: string, resetCode: string, newPassword: string, forceThrow?: boolean ): Promise<boolean> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<void>(( resolve, reject ) => {
          if ( foundUser.resetCode && foundUser.resetCode == resetCode ) {
            resolve();
          } else {
            reject();
          }
        } );

      } )
      .then(( response: any ) => {

        return new Promise<boolean>(( resolve, reject ) => {
          if ( newPassword ) {

            return this.createHash( newPassword )
              .then(( hashedPassword: string ) => {

                return this.updateUserById( userId, {
                  resetCode: "",
                  password: hashedPassword
                } );

              } )
              .then(( updatedUser: interfaces.dataModel.core.user.Super ) => {

                return Promise.resolve( true );

              } );

          } else {

            return Promise.resolve( false );

          }
        } );

      } )
      .then(( response: boolean ) => {

        return Promise.resolve( response );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "ResetPasswordFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  deleteAccount = ( userId: string, password: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authPassword( userId, password );

      } )
      .then(( authenticatedUser: interfaces.dataModel.core.user.Super ) => {

        this.removeUserById( userId );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "DeleteAccountFailed",
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
  removeUserById: storageManagerInterfaces.core.user.RemoveById,
  sendEmail: communicationManagerInterfaces.mailAgent.SendEmail,
  authPassword: authenticationManagerInterfaces.AuthPassword,
  createHash: authenticationManagerInterfaces.CreateHashedPassword,
  signOutSession: sessionManagerInterfaces.SignOut,
  generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
  appName: string;
  host: string;
  sendingAddress: string;
} ): developerInterfaces.Profile => {
  return new Profile(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getUserById,
    params.updateUserById,
    params.removeUserById,
    params.sendEmail,
    params.authPassword,
    params.createHash,
    params.signOutSession,
    params.generateRandomNumber,
    params.appName,
    params.host,
    params.sendingAddress
  )
}

/******************************************************************************/

