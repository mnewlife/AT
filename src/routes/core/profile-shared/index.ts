/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../data-model";
import * as root from "../../../interfaces";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as session from "../../../components/session/interfaces";
import * as storageUser from "../../../components/storage/interfaces/core/user";
import * as helpers from "../../helpers/interfaces";
import * as numbers from "../../../components/helpers/numbers/interfaces";
import * as profileProcedures from "../../../procedures/core/common/profile/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class ProfileShared implements interfaces.Instance {

  /****************************************************/

  constructor(
    private readonly getUserDetails: profileProcedures.GetUserDetails,
    private readonly updateUserDetails: profileProcedures.UpdateUserDetails,
    private readonly changeUserEmailAddress: profileProcedures.ChangeEmailAddress,
    private readonly changeUserPassword: profileProcedures.ChangePassword,
    private readonly requestUserPasswordResetCode: profileProcedures.RequestPasswordResetCode,
    private readonly resetUserPassword: profileProcedures.ResetPassword,
    private readonly deleteUserAccount: profileProcedures.DeleteAccount,
    private readonly generateRandomNumber: numbers.GenerateRandomNumber,
    private readonly signedIn: session.SignedIn,
    private readonly getUserId: session.GetUserId,
    private readonly sendResponse: response.Send
  ) {

  }

  /****************************************************/

  readonly getDetails = ( appContext: root.CoreView ): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "profile";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      return this.getUserDetails( this.getUserId( req ) )
        .then(( foundUser: dataModel.core.user.Super ) => {

          return this.sendResponse( res, appContext, true, null, {
            foundUser: foundUser,
            innerContext: innerContext
          } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, appContext, false, "User not found", { innerContext: innerContext } );
          }

          return this.sendResponse( res, appContext, false, null, { innerContext: innerContext } );

        } );

    }

  }

  /****************************************************/

  readonly updateDetails = ( appContext: root.CoreView ): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "edit-profile";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      let details: storageUser.UpdateDetails = {};

      if ( req.body.personalDetails ) {
        details.personalDetails = {};
        if ( req.body.personalDetails.firstName ) {
          details.personalDetails.firstName = req.body.personalDetails.firstName;
        }
        if ( req.body.personalDetails.lastName ) {
          details.personalDetails.lastName = req.body.personalDetails.lastName;
        }
        if ( req.body.personalDetails.dateOfBirth ) {
          details.personalDetails.dateOfBirth = req.body.personalDetails.dateOfBirth;
        }
        if ( req.body.personalDetails.gender ) {
          details.personalDetails.gender = req.body.personalDetails.gender;
        }
      }

      if ( req.body.contactDetails ) {
        details.contactDetails = {};
        if ( req.body.contactDetails.phoneNumbers ) {
          details.contactDetails.phoneNumbers = req.body.contactDetails.phoneNumbers;
        }
      }

      if ( req.body.residentialDetails ) {
        details.residentialDetails = {};
        if ( req.body.residentialDetails.country ) {
          details.residentialDetails.country = req.body.residentialDetails.country;
        }
        if ( req.body.residentialDetails.province ) {
          details.residentialDetails.province = req.body.residentialDetails.province;
        }
        if ( req.body.residentialDetails.address ) {
          details.residentialDetails.address = req.body.residentialDetails.address;
        }
      }

      if ( !details ) {
        return this.sendResponse( res, appContext, false, "", { innerContext: innerContext } );
      }

      return this.updateUserDetails( this.getUserId( req ), details )
        .then(( updatedUser: dataModel.core.user.Super ) => {

          return this.sendResponse( res, appContext, true, null, {
            updatedUser: updatedUser,
            innerContext: innerContext
          } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, appContext, false, "User not found", { innerContext: innerContext } );
          }

          return this.sendResponse( res, appContext, false, null, { innerContext: innerContext } );

        } );


    }
  }

  /****************************************************/

  readonly changeEmailAddress = ( appContext: root.CoreView ): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "change-email-address";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      if ( !req.body.password ) {
        return this.sendResponse( res, appContext, false, "Password is missing", { innerContext: innerContext } );
      }

      if ( !req.body.newEmailAddress ) {
        return this.sendResponse( res, appContext, false, "The new email address is missing", { innerContext: innerContext } );
      }

      return this.changeUserEmailAddress( this.getUserId( req ), req.body.password, req.body.newEmailAddress, req )
        .then(( response: any ) => {

          return this.sendResponse( res, "passpoint", true, "A verification email has been sent to your email address", { innerContext: innerContext } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, appContext, false, "User not found", { innerContext: innerContext } );
          }

          return this.sendResponse( res, appContext, false, null, { innerContext: innerContext } );

        } );

    }
  }

  /****************************************************/

  readonly changePassword = ( appContext: root.CoreView ): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "profile";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      if ( !req.body.oldPassword ) {
        return this.sendResponse( res, appContext, false, "Password is missing", { innerContext: innerContext } );
      }

      if ( !req.body.newPassword ) {
        return this.sendResponse( res, appContext, false, "The new password is missing", { innerContext: innerContext } );
      }

      return this.changeUserPassword( this.getUserId( req ), req.body.oldPassword, req.body.newPassword )
        .then(( response: any ) => {

          return this.sendResponse( res, appContext, true, null, {
            innerContext: innerContext
          } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, appContext, false, "User not found", { innerContext: innerContext } );
          }

          if ( reason.identifier && reason.identifier == "InvalidPassword" ) {
            return this.sendResponse( res, appContext, false, "InvalidPassword", { innerContext: innerContext } );
          }

          return this.sendResponse( res, appContext, false, null, { innerContext: innerContext } );

        } );

    }
  }

  /****************************************************/

  readonly requestPasswordResetCode = (): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "request-reset-code";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      if ( !req.params.emailAddress ) {
        return this.sendResponse( res, "passpoint", false, "Email address is missing", { innerContext: innerContext } );
      }

      return this.requestUserPasswordResetCode( req.params.emailAddress )
        .then(( response: any ) => {

          return this.sendResponse( res, "passpoint", true, "The reset code has been sent to your email address", { innerContext: innerContext } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, "passpoint", false, "User not found", { innerContext: innerContext } );
          }

          return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );

        } );

    }
  }

  /****************************************************/

  readonly resetPassword = (): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "reset-password";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      return Promise.all( [
        this.generateRandomNumber( 8765, 9172 ),
        this.generateRandomNumber( 8132, 8793 )
      ] )
        .then(( numbers: number[] ) => {

          return this.resetUserPassword( this.getUserId( req ), req.query.resetCode, String( numbers[ 0 ] ) + String( numbers[ 1 ] ) );

        } )
        .then(( newPassword: string ) => {

          return this.sendResponse( res, "passpoint", true, "Your password has been reset", {
            innerContext: innerContext,
            newRandomPassword: newPassword
          } );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, "passpoint", false, "User not found", { innerContext: innerContext } );
          }

          if ( reason.identifier && reason.identifier == "InvalidResetCode" ) {
            return this.sendResponse( res, "passpoint", false, "InvalidResetCode", { innerContext: innerContext } );
          }

          return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );

        } );

    }

  }

  /****************************************************/

  readonly deleteAccount = ( appContext: root.CoreView ): express.RequestHandler => {

    return ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

      let innerContext = "delete-account";

      if ( !this.signedIn( req ) ) {
        return this.sendResponse( res, "passpoint", false, null, { innerContext: innerContext } );
      }

      return this.deleteUserAccount( this.getUserId( req ), req.body.password )
        .then(( response: any ) => {

          return this.sendResponse( res, "passpoint", true, "Account deleted", null );

        } )
        .catch(( reason: any ) => {

          if ( reason.identifier && reason.identifier == "UserNotFound" ) {
            return this.sendResponse( res, appContext, false, "User not found", { innerContext: innerContext } );
          }

          if ( reason.identifier && reason.identifier == "InvalidResetCode" ) {
            return this.sendResponse( res, appContext, false, "InvalidResetCode", { innerContext: innerContext } );
          }

          return this.sendResponse( res, appContext, false, null, { innerContext: innerContext } );

        } );

    }

  }

  /****************************************************/

}


/******************************************************************************/