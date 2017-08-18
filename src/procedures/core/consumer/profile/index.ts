/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as consumerInterfaces from "../../../../src/procedures/core/consumer";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sessionInterfaces from "../../../../src/components/session";
import * as communicationInterfaces from "../../../../src/components/communication";
import * as authenticationInterfaces from "../../../../src/components/authentication";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Profile implements consumerInterfaces.Profile {

  constructor(
    private readonly events: consumerInterfaces.auth.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly updateUserById: storageInterfaces.core.user.UpdateById,
    private readonly removeUserById: storageInterfaces.core.user.RemoveById,
    private readonly sendEmail: communicationInterfaces.mailAgent.SendEmail,
    private readonly authPassword: authenticationInterfaces.AuthPassword,
    private readonly createHash: authenticationInterfaces.CreateHashedPassword,
    private readonly signOutSession: sessionInterfaces.SignOut,
    private readonly generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
    private readonly appName: string,
    private readonly host: string,
    private readonly sendingAddress: string
  ) { }

  getUserDetails = ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: dataModel.core.user.Super ) => {

        return new Promise<dataModel.core.user.Super>(( resolve, reject ) => {
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

  updateUserDetails = ( userId: string, details: storageInterfaces.core.user.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.updateUserById( userId, details );

      } )
      .then(( updatedUser: dataModel.core.user.Super ) => {

        return new Promise<dataModel.core.user.Super>(( resolve, reject ) => {
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
      .then(( authenticatedUser: dataModel.core.user.Super ) => {

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
          .then(( updatedUser: dataModel.core.user.Super ) => {

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
          "<a href='" + this.host + "/core/consumer/registration/verifyAccount/" + verificationCode + "'>",
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
      .then(( authenticatedUser: dataModel.core.user.Super ) => {

        return this.createHash( newPassword );

      } )
      .then(( hashedPassword: string ) => {

        return this.updateUserById( userId, {
          password: hashedPassword
        } );

      } )
      .then(( updatedUser: dataModel.core.user.Super ) => {

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
          .then(( updatedUser: dataModel.core.user.Super ) => {

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
          "<a href='" + this.host + "/core/consumer/profile/resetPassword/" + response.resetCode + "'>",
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
      .then(( foundUser: dataModel.core.user.Super ) => {

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
              .then(( updatedUser: dataModel.core.user.Super ) => {

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
      .then(( authenticatedUser: dataModel.core.user.Super ) => {

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
  getUserById: storageInterfaces.core.user.GetById,
  updateUserById: storageInterfaces.core.user.UpdateById,
  removeUserById: storageInterfaces.core.user.RemoveById,
  sendEmail: communicationInterfaces.mailAgent.SendEmail,
  authPassword: authenticationInterfaces.AuthPassword,
  createHash: authenticationInterfaces.CreateHashedPassword,
  signOutSession: sessionInterfaces.SignOut,
  generateRandomNumber: sharedLogicInterfaces.numbers.GenerateRandomNumber,
  appName: string;
  host: string;
  sendingAddress: string;
} ): consumerInterfaces.Profile => {
  return new Profile(
    eventsFactory( params.emitEvent ),
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

