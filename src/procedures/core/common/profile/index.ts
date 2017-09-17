/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as environment from "../../../../environment";
import * as supportDetails from "../../../../environment/support-details";

import * as authentication from "../../../../components/authentication/interfaces";
import * as storageUser from "../../../../components/storage/interfaces/core/user";
import * as session from "../../../../components/session/interfaces";
import * as mailAgent from "../../../../components/communication/mail-agent/interfaces";
import * as mailTemplates from "../mail-templates/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";
import * as numbers from "../../../../components/helpers/numbers/interfaces";

import * as helpers from "../helpers/interfaces";
import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export default class Profile implements interfaces.Instance {

  /****************************************************************/

  constructor(
    private readonly events: events.Instance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly cleanUsers: helpers.CleanUsers,
    private readonly newEmailAddressTemplate: mailTemplates.NewEmailAddress,
    private readonly passwordResetTemplate: mailTemplates.PasswordReset,
    private readonly sendEmail: mailAgent.SendEmail,
    private readonly authPassword: authentication.AuthPassword,
    private readonly createHash: authentication.CreateHashedPassword,
    private readonly signedIn: session.SignedIn,
    private readonly signOutSession: session.SignOut,
    private readonly generateRandomNumber: numbers.GenerateRandomNumber,
    private readonly getUserById: storageUser.Instance[ "getById" ],
    private readonly updateUserById: storageUser.Instance[ "updateById" ],
    private readonly removeUserById: storageUser.Instance[ "removeById" ],
  ) { }

  /****************************************************************/

  getUserDetails = ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: dataModel.core.user.Super ) => {

        return this.cleanUsers( [ foundUser ] );

      } )
      .then(( cleanedUsers: dataModel.core.user.Super[] ) => {

        return Promise.resolve( cleanedUsers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

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

        return this.cleanUsers( [ updatedUser ] );

      } )
      .then(( cleanedUsers: dataModel.core.user.Super[] ) => {

        return Promise.resolve( cleanedUsers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        return Promise.reject( {
          identifier: "UpdateUserDetailsFailed",
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
        ] );

      } )
      .then(( randomNumbers: number[] ) => {

        return Promise.resolve( String( randomNumbers[ 0 ] ) + String( randomNumbers[ 1 ] ) );

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

        return this.newEmailAddressTemplate(
          newEmailAddress,
          verificationCode,
          supportDetails.default.phoneNumber,
          supportDetails.default.emailAddress
        );

      } )
      .then(( html: string ) => {

        return this.sendEmail( supportDetails.default.sendingAddress, [ newEmailAddress ], environment.default.applicationName + " | Account Verification", html );

      } )
      .then(( response: any ) => {

        if ( this.signedIn( req ) ) {
          return this.signOutSession( req );
        } else {
          return Promise.resolve();
        }

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        if ( reason.identifier && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( reason );
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

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        if ( reason.identifier && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( reason );
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
        ] );

      } )
      .then(( randomNumbers: number[] ) => {

        return Promise.resolve( String( randomNumbers[ 0 ] ) + String( randomNumbers[ 1 ] ) );

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

        return this.passwordResetTemplate(
          response.emailAddress,
          response.resetCode,
          supportDetails.default.phoneNumber,
          supportDetails.default.emailAddress
        )
          .then(( html: string ) => {

            return Promise.resolve( {
              html: html,
              emailAddress: response.emailAddress
            } );

          } );

      } )
      .then(( response: { html: string, emailAddress: string } ) => {

        return this.sendEmail(
          supportDetails.default.sendingAddress,
          [ response.emailAddress ],
          environment.default.applicationName + " | Account Verification",
          response.html
        );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
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

  resetPassword = ( userId: string, resetCode: string, newPassword: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserById( userId );

      } )
      .then(( foundUser: dataModel.core.user.Super ) => {

        return new Promise<void>(( resolve, reject ) => {
          if ( foundUser.resetCode && foundUser.resetCode == resetCode ) {
            resolve();
          } else {
            reject( {
              identifier: "InvalidResetCode"
            } );
          }
        } );

      } )
      .then(( response: any ) => {

        return this.createHash( newPassword );

      } )
      .then(( hashedPassword: string ) => {

        return this.updateUserById( userId, {
          resetCode: "",
          password: hashedPassword
        } );

      } )
      .then(( updatedUser: dataModel.core.user.Super ) => {

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        if ( reason.identifier && reason.identifier === "InvalidResetCode" ) {
          return Promise.reject( reason );
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

  deleteAccount = ( userId: string, password: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authPassword( userId, password );

      } )
      .then(( authenticatedUser: dataModel.core.user.Super ) => {

        this.removeUserById( userId );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        if ( reason.identifier && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( reason );
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
