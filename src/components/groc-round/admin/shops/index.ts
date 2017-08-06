/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/core/admin";
import * as authenticationManagerInterfaces from "../../../../interfaces/utilities/authentication-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Auth implements adminInterfaces.Auth {

  private readonly emitter: adminInterfaces.auth.Emitter;
  private readonly authSignIn: authenticationManagerInterfaces.SignIn;
  private readonly authSignOut: authenticationManagerInterfaces.SignOut;
  private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow;

  constructor( params: {
    emitter: adminInterfaces.auth.Emitter,
    authSignIn: authenticationManagerInterfaces.SignIn,
    authSignOut: authenticationManagerInterfaces.SignOut,
    checkThrow: sharedLogicInterfaces.moders.CheckThrow
  } ) {
    this.emitter = params.emitter;
    this.authSignIn = params.authSignIn;
    this.authSignOut = params.authSignOut;
    this.checkThrow = params.checkThrow;
  }

  signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Admin> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.authSignIn( emailAddress, password, req );

      } )
      .then(( signedInUser: interfaces.dataModel.core.user.Admin ) => {

        signedInUser.password = "";
        return Promise.resolve( signedInUser );

      } )
      .catch(( reason: any ) => {

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
} ): adminInterfaces.Auth => {
  return new Auth( {
    emitter: emitterFactory( params.emitEvent ),
    authSignIn: params.authSignIn,
    authSignOut: params.authSignOut,
    checkThrow: params.checkThrow
  } )
}

/******************************************************************************/

