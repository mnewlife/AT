/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as consumerInterfaces from "../../../../src/procedures/core/consumer";
import * as authenticationInterfaces from "../../../../src/components/authentication";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Auth implements consumerInterfaces.Auth {

  constructor(
    private readonly events: consumerInterfaces.auth.Events,
    private readonly authSignIn: authenticationInterfaces.SignIn,
    private readonly authSignOut: authenticationInterfaces.SignOut,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow
  ) { }

  signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<dataModel.core.user.Consumer> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authSignIn( emailAddress, password, req );

      } )
      .then(( signedInUser: dataModel.core.user.Super ) => {

        return new Promise<dataModel.core.user.Consumer>(( resolve, reject ) => {
          if ( signedInUser.accessLevel == "consumer" ) {
            resolve( signedInUser as dataModel.core.user.Consumer );
          } else {
            reject( {
              identifier: "NotConsumer",
              data: {}
            } );
          }
        } );

      } )
      .then(( prunedUser: dataModel.core.user.Consumer ) => {

        prunedUser.password = "";
        return Promise.resolve( prunedUser );

      } )
      .catch(( reason: any ) => {

        if ( reason && reason.identifier === "NotConsumer" ) {
          return Promise.reject( {
            identifier: "NotConsumer",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "SignInFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  signOut = ( req: express.Request, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authSignOut( req );

      } )
      .then(( response: any ) => {

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "SignOutFailed",
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
  authSignIn: authenticationInterfaces.SignIn,
  authSignOut: authenticationInterfaces.SignOut,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow
} ): consumerInterfaces.Auth => {
  return new Auth(
    eventsFactory( params.emitEvent ),
    params.authSignIn,
    params.authSignOut,
    params.checkThrow
  )
}

/******************************************************************************/

