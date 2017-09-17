/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";
import * as EventListener from "../../../../event-listener/interfaces";
import * as Components from "../../../../components/interfaces";
import * as environment from "../../../../environment";
import * as supportDetails from "../../../../environment/support-details";

import * as storageUser from "../../../../components/storage/interfaces/core/user";
import * as numbers from "../../../../components/helpers/numbers/interfaces";
import * as authentication from "../../../../components/authentication/interfaces";
import * as mailTemplates from "../../../../procedures/core/common/mail-templates/interfaces";
import * as mailAgent from "../../../../components/communication/mail-agent/interfaces";
import * as response from "../../../../components/response/interfaces";

/******************************************************************************/

export default (
  getUsers: storageUser.Instance[ "get" ],
  generateRandomNumber: numbers.GenerateRandomNumber,
  createHashedPassword: authentication.CreateHashedPassword,
  addUser: storageUser.Instance[ "add" ],
  newEmailAddressTemplate: mailTemplates.NewEmailAddress,
  sendEmail: mailAgent.SendEmail,
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  /*********************************************************/

  router.post( "/signUp", signUp );

  /*********************************************************/

  function signUp ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !req.body.emailAddress ) {
      return sendResponse( res, "passpoint", false, "Email address is missing", null );
    }

    if ( !req.body.password ) {
      return sendResponse( res, "passpoint", false, "Password is missing", null );
    }

    let verificationCode: string;

    return getUsers( {
      emailAddress: req.body.emailAddress
    }, null, 1 )
      .then(( users: dataModel.core.user.Super[] ) => {

        if ( users.length ) {
          return Promise.reject( {
            identifier: "AddressAlreadyTaken"
          } );
        }

        return Promise.all( [
          generateRandomNumber( 1543, 9812 ),
          generateRandomNumber( 5123, 7623 )
        ] );

      } )
      .then(( numbers: number[] ) => {

        verificationCode = String( numbers[ 0 ] ) + String( numbers[ 1 ] );

        return createHashedPassword( req.body.password );

      } )
      .then(( hashedPassword: string ) => {

        return addUser( {
          emailAddress: req.body.emailAddress,
          accessLevel: "consumer",
          password: hashedPassword,
          verification: {
            verified: false,
            verificationCode: verificationCode
          },
          activeApps: []
        } );

      } )
      .then(( addedUser: dataModel.core.user.Super ) => {

        return this.newEmailAddressTemplate(
          req.body.emailAddress,
          verificationCode,
          supportDetails.default.phoneNumber,
          supportDetails.default.emailAddress
        );

      } )
      .then(( html: string ) => {

        return this.sendEmail( supportDetails.default.sendingAddress, [ req.body.emailAddress ], environment.default.applicationName + " | Account Verification", html );

      } )
      .then(( response: any ) => {

        return sendResponse( res, "passpoint", true, "", null );

      } )
      .catch(( reason: any ) => {

        if ( reason.identifier && reason.identifier == "AddressAlreadyTaken" ) {
          return sendResponse( res, "passpoint", false, "That email address is already in use", null );
        }

        return sendResponse( res, "passpoint", false, null, null );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/