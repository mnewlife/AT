/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as bCrypt from "bcrypt-nodejs";

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as authenticationInterfaces from "../../../src/components/authentication";
import * as sharedLogicInterfaces from "../../../src/components/shared-logic";
import * as sessionInterfaces from "../../../src/components/session";
import * as storageInterfaces from "../../../src/components/storage";

import eventsFactory from "./events";

/******************************************************************************/

class Canon implements interfaces.Authentication {

  middleware: express.RequestHandler[] = [];

  /*****************************************************************/

  private readonly isValidPassword = ( password: string, hashedPassword: string ): boolean => {
    return bCrypt.compareSync( password, hashedPassword );
  };

  private readonly createHash = ( password: string ): string => {
    return bCrypt.hashSync( password, bCrypt.genSaltSync( 10 ) );
  };

  /*****************************************************************/

  constructor(
    private readonly events: authenticationInterfaces.Events,
    
    private readonly getUserFromStorage: storageInterfaces.core.user.Get,
    private readonly getUserByIdFromStorage: storageInterfaces.core.user.GetById,
    
    private readonly setCurrentUserInSession: sessionInterfaces.SetCurrentUser,
    private readonly getCurrentUserFromSession: sessionInterfaces.GetCurrentUser,
    private readonly signOutOfSession: sessionInterfaces.SignOut,
    
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow
  ) {

  }

  /*****************************************************************/

  readonly signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUserFromStorage( {
          emailAddress: emailAddress
        }, null, null );

      } )
      .then(( foundUsers: dataModel.core.user.Super[] ) => {

        return new Promise<any>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUsers[ 0 ].password ) ) {
            return resolve( foundUsers[ 0 ] );
          }

          new Promise<void>(( resolve, reject ) => {
            let event = this.events.invalidPassword( {
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
      .then(( authenticUser: dataModel.core.user.Super ) => {

        return this.setCurrentUserInSession( authenticUser, req )
          .then(( sessionedUser: dataModel.core.user.Super ) => {
            return Promise.resolve( sessionedUser );
          } );

      } )
      .then(( signedInUser: dataModel.core.user.Super ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.signedIn( {
            user: signedInUser
          } );
          resolve();
        } );

        return Promise.resolve( signedInUser );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.signInFailed( {
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
          this.events.signOutFailed( {
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

  readonly getCurrentUser = ( req: express.Request, forceThrow = false ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getCurrentUserFromSession( req );
      } )
      .then(( currentUser: dataModel.core.user.Super ) => {
        return Promise.resolve( currentUser );
      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getCurrentUserFailed( {
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

  readonly authPassword = ( userId: string, password: string, forceThrow = false ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        return this.getUserByIdFromStorage( userId );
      } )
      .then(( foundUser: dataModel.core.user.Super ) => {

        return new Promise<dataModel.core.user.Super>(( resolve, reject ) => {

          if ( this.isValidPassword( password, foundUser.password ) ) {
            return resolve( foundUser );
          }

          new Promise<void>(( resolve, reject ) => {
            this.events.invalidPassword( {
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
          this.events.authPasswordFailed( {
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
          this.events.createHashedPasswordFailed( {
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
  getUserFromStorage: storageInterfaces.core.user.Get;
  getUserByIdFromStorage: storageInterfaces.core.user.GetById,
  setCurrentUserInSession: sessionInterfaces.SetCurrentUser;
  getCurrentUserFromSession: sessionInterfaces.GetCurrentUser;
  signOutOfSession: sessionInterfaces.SignOut;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow
} ): src.components.Authentication => {

  return new BasicAuthentication( {
    events: eventsFactory( params.emit ),
    getUserFromStorage: params.getUserFromStorage,
    getUserByIdFromStorage: params.getUserByIdFromStorage,
    setCurrentUserInSession: params.setCurrentUserInSession,
    getCurrentUserFromSession: params.getCurrentUserFromSession,
    signOutOfSession: params.signOutOfSession,
    checkThrow: params.checkThrow
  } );

}

/******************************************************************************/
