/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as expressSession from "express-session";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener";
import * as Storage from "../../storage/interfaces";
import * as Moders from "../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";
import * as Events from "../events/interfaces";

/******************************************************************************/

export default class Canon implements interfaces.Instance {

  middleware: express.RequestHandler[] = [];

  middlewareConfiguration: express.RequestHandler;

  /*****************************************************************/

  constructor(
    private readonly events: Events.Instance,
    private readonly checkThrow: Moders.CheckThrow,
    private readonly getUserById: Storage.core.user.Instance[ "getById" ],
    private readonly production: boolean
  ) {

    this.middlewareConfiguration = expressSession( {
      name: "Athena",
      secret: "secregrandt",
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: ( this.production ) ? true : false,
        httpOnly: true
      }
    } );

    this.middleware.push(( req: express.Request, res: express.Response, next: express.NextFunction ) => {
      if ( req.session ) {
        return next();
      }
      let tryCount = 1;
      let maxTries = 3;

      lookupSession( "" );

      function lookupSession ( error: any ) {
        if ( error ) {
          throw error;
        }
        if ( req.session ) {
          return next();
        }
        tryCount += 1;
        if ( tryCount > maxTries ) {
          throw new Error( "Session: Couldn't retain session" );
        }
        this.middlewareConfiguration( req, res, lookupSession );
      }

    } );
  }

  /*****************************************************************/

  readonly signedIn = ( req: express.Request ): boolean => {

    if ( req.session.userId ) {
      return true;
    } else {
      return false;
    }

  }

  /*****************************************************************/

  readonly setCurrentUser = ( userId: string, req: express.Request, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        req.session.userId = userId;

        new Promise<void>(( resolve, reject ) => {
          this.events.setCurrentUser( {
            userId: userId,
            req: req
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.setCurrentUserFailed( {
            userId: userId,
            req: req,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SetCurrentUserFailed",
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

        if ( req.session.userId ) {

          return this.getUserById( req.session.userId );

        } else {

          new Promise<void>(( resolve, reject ) => {
            this.events.noCurrentUser( {
              req: req
            } );
            resolve();
          } );

          return Promise.reject( {
            identifier: "NoCurrentUser",
            data: {}
          } );

        }

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getCurrentUserFailed( {
            req: req,
            reason: reason
          } );
          resolve();
        } );

        if ( reason && reason.identifier === "NoCurrentUser" ) {
          return Promise.reject( {
            identifier: "NoCurrentUser",
            data: {
              reason: reason
            }
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

  readonly signOut = ( req: express.Request, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any>(( resolve, reject ) => {
          req.session.destroy(( err: any ) => {
            if ( err ) {
              reject( err );
            } else {
              resolve();
            }
          } );
        } );

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

}

/******************************************************************************/
