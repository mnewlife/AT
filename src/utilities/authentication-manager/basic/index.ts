/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../interfaces/index";
import * as authenticationManagerInterfaces from "../../../interfaces/utilities/authentication-manager/index";
import * as sessionManagerInterfaces from "../../../interfaces/utilities/session-manager/index";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager/index";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic/index";

import { UserModel } from "../../../utilities/storage-manager/mongodb/user/model/index";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicAuthenticationManager implements interfaces.utilities.AuthenticationManager {

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  private readonly emitter: authenticationManagerInterfaces.Emitter;

  private readonly storageGetUser: storageManagerInterfaces.user.Get;
  private readonly storageGetUserById: storageManagerInterfaces.user.GetById;

  private readonly sessionSetCurrentUser: sessionManagerInterfaces.SetCurrentUser;
  private readonly sessionGetCurrentUser: sessionManagerInterfaces.GetCurrentUser;
  private readonly sessionSignOut: sessionManagerInterfaces.SignOut;

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

    this.storageGetUser = params.storageGetUser;
    this.storageGetUserById = params.storageGetUserById;

    this.sessionSetCurrentUser = params.sessionSetCurrentUser;
    this.sessionGetCurrentUser = params.sessionGetCurrentUser;
    this.sessionSignOut = params.sessionSignOut;

    this.checkThrow = params.checkThrow;

  }

  /*****************************************************************/

  readonly signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<UserModel> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.storageGetUser( {
          emailAddress: emailAddress
        }, null, null );

      } )
      .then(( foundUser: UserModel ) => {

        return new Promise<any>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUser.password ) ) {
            resolve( foundUser );
          } else {

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

          }

        } );

      } )
      .then(( foundUser: UserModel ) => {

        return this.sessionSetCurrentUser( foundUser, req )
          .then(( sessionedUser: UserModel ) => {
            return Promise.resolve( foundUser );
          } )

      } )
      .then(( signedInUser: UserModel ) => {

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
        return this.sessionSignOut( req );
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

  readonly getCurrentUser = ( req: express.Request, forceThrow = false ): Promise<UserModel> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.sessionGetCurrentUser( req );
      } )
      .then(( currentUser: UserModel ) => {
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

  readonly authPassword = ( userId: string, password: string, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.storageGetUserById( mongoose.Types.ObjectId( userId ) );

      } )
      .then(( foundUser: UserModel ) => {

        return new Promise<void>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUser.password ) ) {
            resolve();
          } else {

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

          }

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

export default ( config: interfaces.Config ): interfaces.utilities.AuthenticationManager => {

  return new BasicAuthenticationManager( {

    emitter: emitterFactory( config.eventManager.emit ),

    storageGetUser: config.utilities.storageManager.user.get,
    storageGetUserById: config.utilities.storageManager.user.getById,

    sessionSetCurrentUser: config.utilities.sessionManager.setCurrentUser,
    sessionGetCurrentUser: config.utilities.sessionManager.getCurrentUser,
    sessionSignOut: config.utilities.sessionManager.signOut,

    checkThrow: config.utilities.sharedLogic.moders.checkThrow

  } );

}

/******************************************************************************/
