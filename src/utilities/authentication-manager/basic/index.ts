/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as authenticationManagerInterfaces from "../../../interfaces/utilities/authentication-manager";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic";
import * as sessionManagerInterfaces from "../../../interfaces/utilities/session-manager";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicAuthenticationManager implements interfaces.utilities.AuthenticationManager {

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  private readonly emitter: authenticationManagerInterfaces.Emitter;

  private readonly getUserFromStorage: storageManagerInterfaces.core.user.Get;
  private readonly getUserByIdFromStorage: storageManagerInterfaces.core.user.GetById;

  private readonly setCurrentUserInSession: sessionManagerInterfaces.SetCurrentUser;
  private readonly getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;
  private readonly signOutOfSession: sessionManagerInterfaces.SignOut;

  private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow;

  /*****************************************************************/

  private readonly isValidPassword = ( password: string, hashedPassword: string ): boolean => {
    return bCrypt.compareSync( password, hashedPassword );
  };

  private readonly createHash = ( password: string ): string => {
    return bCrypt.hashSync( password, bCrypt.genSaltSync( 10 ) );
  };

  /*****************************************************************/

  constructor( params: authenticationManagerInterfaces.Params ) {
    this.emitter = params.emitter;
    this.getUserFromStorage = params.getUserFromStorage;
    this.getUserByIdFromStorage = params.getUserByIdFromStorage;
    this.setCurrentUserInSession = params.setCurrentUserInSession;
    this.getCurrentUserFromSession = params.getCurrentUserFromSession;
    this.signOutOfSession = params.signOutOfSession;
    this.checkThrow = params.checkThrow;
  }

  /*****************************************************************/

  readonly signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserFromStorage( {
          emailAddress: emailAddress
        }, null, null );

      } )
      .then(( foundUsers: interfaces.dataModel.core.user.Super[] ) => {

        return new Promise<any>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUsers[ 0 ].password ) ) {
            return resolve( foundUsers[ 0 ] );
          }

          new Promise<void>(( resolve, reject ) => {
            let event = this.emitter.invalidPassword( {
              emailAddress: emailAddress,
              password: password
            } );
            resolve();
          } );

          reject( {
            identifier: "invalidPassword",
            data: {
              emailAddress: emailAddress,
              password: password
            }
          } );

        } );

      } )
      .then(( authenticUser: interfaces.dataModel.core.user.Super ) => {

        return this.setCurrentUserInSession( authenticUser, req )
          .then(( sessionedUser: interfaces.dataModel.core.user.Super ) => {
            return Promise.resolve( sessionedUser );
          } );

      } )
      .then(( signedInUser: interfaces.dataModel.core.user.Super ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.signedIn( {
            user: signedInUser
          } );
          resolve();
        } );

        return Promise.resolve( signedInUser );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.signInFailed( {
            emailAddress: emailAddress,
            reason: reason
          } );
          resolve();
        } );

        if ( reason && reason.identifier === "UserNotFound" ) {
          return Promise.reject( {
            identifier: "UserNotFound",
            data: {
              reason: reason
            }
          } );
        }

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {
              reason: reason
            }
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

  /*****************************************************************/

  readonly signOut = ( req: express.Request, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.signOutOfSession( req );
      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.signOutFailed( {
            req: req,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SignOutFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getCurrentUser = ( req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getCurrentUserFromSession( req );
      } )
      .then(( currentUser: interfaces.dataModel.core.user.Super ) => {
        return Promise.resolve( currentUser );
      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getCurrentUserFailed( {
            req: req,
            reason: reason
          } );
        } );

        if ( reason && reason.identifier === "NoCurrentUser" ) {
          return Promise.reject( {
            identifier: "NoCurrentUser",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "GetCurrentUserFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly authPassword = ( userId: string, password: string, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserByIdFromStorage( userId );
      } )
      .then(( foundUser: interfaces.dataModel.core.user.Super ) => {

        return new Promise<interfaces.dataModel.core.user.Super>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUser.password ) ) {
            return resolve( foundUser );
          }

          new Promise<void>(( resolve, reject ) => {
            this.emitter.invalidPassword( {
              userId: userId,
              password: password
            } );
            resolve();
          } );

          reject( {
            identifier: "InvalidPassword",
            data: {
              userId: userId,
              password: password
            }
          } );

        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.authPasswordFailed( {
            userId: userId,
            password: password,
            reason: reason
          } );
          resolve();
        } );

        if ( reason && reason.identifier === "InvalidPassword" ) {
          return Promise.reject( {
            identifier: "InvalidPassword",
            data: {}
          } );
        }

        return Promise.reject( {
          identifier: "AuthPasswordFailed",
          data: {}
        } );

      } );

  }

  /*****************************************************************/

  readonly createHashedPassword = ( password: string, forceThrow = false ): Promise<string> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any>(( resolve, reject ) => {
          try {
            let hashedPassword: string = this.createHash( password );
            resolve( hashedPassword );
          } catch ( err ) {
            reject( err );
          }
        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.createHashedPasswordFailed( {
            password: password,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "CreateHashedPasswordFailed",
          data: {}
        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( params: {
  emit: eventManagerInterfaces.Emit;
  getUserFromStorage: storageManagerInterfaces.core.user.Get;
  getUserByIdFromStorage: storageManagerInterfaces.core.user.GetById,
  setCurrentUserInSession: sessionManagerInterfaces.SetCurrentUser;
  getCurrentUserFromSession: sessionManagerInterfaces.GetCurrentUser;
  signOutOfSession: sessionManagerInterfaces.SignOut;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow
} ): interfaces.utilities.AuthenticationManager => {

  return new BasicAuthenticationManager( {
    emitter: emitterFactory( params.emit ),
    getUserFromStorage: params.getUserFromStorage,
    getUserByIdFromStorage: params.getUserByIdFromStorage,
    setCurrentUserInSession: params.setCurrentUserInSession,
    getCurrentUserFromSession: params.getCurrentUserFromSession,
    signOutOfSession: params.signOutOfSession,
    checkThrow: params.checkThrow
  } );
  
}

/******************************************************************************/
