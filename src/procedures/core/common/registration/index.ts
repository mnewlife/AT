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

export default class Registration implements interfaces.Instance {

  /****************************************************************/

  constructor(
    private readonly events: events.Instance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly getUserById: storageUser.Instance[ "getById" ],
    private readonly updateUserById: storageUser.Instance[ "updateById" ]
  ) { }

  /****************************************************************/

  readonly verifyAccount = ( userId: string, code: string, forceThrow?: boolean ): Promise<void> => {

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
            verificationCode: ""
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

  /****************************************************************/

}

/******************************************************************************/