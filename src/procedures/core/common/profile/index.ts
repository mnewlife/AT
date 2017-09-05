/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";

import * as authentication from "../../../../components/authentication/interfaces";
import * as storageUser from "../../../../components/storage/interfaces/core/user";
import * as session from "../../../../components/session/interfaces";
import * as mailAgent from "../../../../components/communication/mail-agent/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";
import * as numbers from "../../../../components/helpers/numbers/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export default class Profile implements interfaces.ClassInstance {

  /****************************************************************/

  constructor(
    private readonly events: events.ClassInstance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly getUserById: storageUser.ClassInstance[ "getById" ],
    private readonly updateUserById: storageUser.ClassInstance[ "updateById" ],
    private readonly removeUserById: storageUser.ClassInstance[ "removeById" ],
    private readonly sendEmail: mailAgent.SendEmail,
    private readonly authPassword: authentication.AuthPassword,
    private readonly createHash: authentication.CreateHashedPassword,
    private readonly signOutSession: session.SignOut,
    private readonly generateRandomNumber: numbers.GenerateRandomNumber,
    private readonly appName: string,
    private readonly host: string,
    private readonly sendingAddress: string
  ) { }

  /****************************************************************/

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

  /****************************************************************/

  updateUserDetails = ( userId: string, details: storageUser.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => {

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

  /****************************************************************/

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
          "<a href='" + this.host + "/core/admin/registration/verifyAccount/" + verificationCode + "'>",
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

  /****************************************************************/

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

  /****************************************************************/

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
          "<a href='" + this.host + "/core/admin/profile/resetPassword/" + response.resetCode + "'>",
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

  /****************************************************************/

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

  /****************************************************************/

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

  /****************************************************************/

}

/******************************************************************************/
