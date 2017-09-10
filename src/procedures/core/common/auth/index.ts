/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener";
import * as authentication from "../../../../components/authentication/interfaces";
import * as moders from "../../../../components/helpers/moders/interfaces";
import * as helpers from "../helpers/interfaces";

import * as interfaces from "./interfaces";
import * as events from "./events/interfaces";

/******************************************************************************/

export default class Auth implements interfaces.Instance {

  /****************************************************************/

  constructor(
    private readonly events: events.Instance,
    private readonly checkThrow: moders.CheckThrow,
    private readonly cleanUsers: helpers.CleanUsers,
    private readonly authSignIn: authentication.SignIn
  ) { }

  /****************************************************************/

  signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authSignIn( emailAddress, password, req );

      } )
      .then(( signedInUser: dataModel.core.user.Super ) => {

        return this.cleanUsers( [ signedInUser ] );

      } )
      .then(( cleanedUsers: dataModel.core.user.Super[] ) => {

        return Promise.resolve( cleanedUsers[ 0 ] );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "UserNotFound" ) {
          return Promise.reject( reason );
        }

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( reason );
        }

        return Promise.reject( {
          identifier: "SignInFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /****************************************************************/

}

/******************************************************************************/