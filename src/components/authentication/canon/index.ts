/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as bCrypt from "bcrypt-nodejs";

import * as dataModel from "../../../data-model";
import * as eventListener from "../../../event-listener";
import * as moders from "../../helpers/moders/interfaces";
import * as session from "../../session/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";

import * as Events from "../events/interfaces";

/******************************************************************************/

export default class Canon implements interfaces.Instance {

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
    private readonly events: Events.Instance,
    private readonly checkThrow: moders.CheckThrow,

    private readonly getUsers: storageUser.Instance[ "get" ],
    private readonly getUserById: storageUser.Instance[ "getById" ],

    private readonly setUserInSession: session.SetCurrentUser,
    private readonly getUserFromSession: session.GetCurrentUser,
    private readonly signOutOfSession: session.SignOut

  ) { }

  /*****************************************************************/

  readonly signIn = ( emailAddress: string, password: string, req: express.Request, forceThrow = false ): Promise<dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getUsers( {
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

        return this.setUserInSession( authenticUser.id, req )
          .then(( response: any ) => {

            new Promise<void>(( resolve, reject ) => {
              this.events.signedIn( {
                user: authenticUser
              } );
              resolve();
            } );

            return Promise.resolve( authenticUser );

          } );

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

        return this.getUserFromSession( req );

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

        return this.getUserById( userId );

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
            resolve( this.createHash( password ) );
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
