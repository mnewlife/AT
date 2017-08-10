/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/core/consumer";
import * as authenticationManagerInterfaces from "../../../../interfaces/utilities/authentication-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Auth implements consumerInterfaces.Auth {

  constructor(
    private readonly emitter: consumerInterfaces.auth.Emitter,
    private readonly authSignIn: authenticationManagerInterfaces.SignIn,
    private readonly authSignOut: authenticationManagerInterfaces.SignOut,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow
  ) { }

  signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Consumer> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authSignIn( emailAddress, password, req );

      } )
      .then(( signedInUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<interfaces.dataModel.core.user.Consumer>(( resolve, reject ) => {
          if ( signedInUser.accessLevel == "consumer" ) {
            resolve( signedInUser as interfaces.dataModel.core.user.Consumer );
          } else {
            reject( {
              identifier: "NotConsumer",
              data: {}
            } );
          }
        } );

      } )
      .then(( prunedUser: interfaces.dataModel.core.user.Consumer ) => {

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
  authSignIn: authenticationManagerInterfaces.SignIn,
  authSignOut: authenticationManagerInterfaces.SignOut,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow
} ): consumerInterfaces.Auth => {
  return new Auth(
    emitterFactory( params.emitEvent ),
    params.authSignIn,
    params.authSignOut,
    params.checkThrow
  )
}

/******************************************************************************/

