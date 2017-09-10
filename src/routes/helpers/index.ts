/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../data-model";
import * as root from "../../interfaces";
import * as session from "../../components/session/interfaces";
import * as moders from "../../components/helpers/moders/interfaces";

import * as interfaces from "./interfaces";

/******************************************************************************/

export default class Helpers implements interfaces.Instance {

  /*****************************************************************/

  private readonly apps: root.AppName[] = [ "core", "call263", "grocRound", "powertel", "routers" ];

  /*****************************************************************/

  constructor(
    private readonly checkThrow: moders.CheckThrow,
    private readonly signedIn: session.SignedIn,
    private readonly getUserFromSession: session.GetCurrentUser
  ) { }

  /*****************************************************************/

  readonly setViewContexts = ( req: express.Request, user?: dataModel.core.user.Super, appContext?: root.AppName, innerContext?: string, forceThrow = false ): Promise<interfaces.ContextsOutput> => {

    let output: interfaces.ContextsOutput;
    let currentUser: dataModel.core.user.Super;
    let finalAppContext: root.AppName;
    let consumer: boolean = false;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<root.AppName>(( resolve, reject ) => {

          if ( appContext ) {
            finalAppContext = appContext;
            return resolve( appContext );
          }

          let matches = this.apps.filter(( app ) => {
            return ( app == req.query.accessLevel );
          } );

          if ( matches.length ) {
            finalAppContext = matches[ 0 ];
            return resolve( matches[ 0 ] );
          } else {
            return resolve( "core" );
          }

        } );

      } )
      .then(( appContext: root.AppName ) => {

        return new Promise<string>(( resolve, reject ) => {

          if ( user ) {
            currentUser = user;
            if ( currentUser.accessLevel == "consumer" ) {
              consumer = true;
            }
            return resolve( [ appContext as string, currentUser.accessLevel as string ].join( "-" ) );
          }

          if ( !this.signedIn( req ) ) {
            return reject( {
              identifier: "NotSignedIn",
              data: {}
            } );
          }

          this.getUserFromSession( req )
            .then(( foundUser: dataModel.core.user.Super ) => {
              currentUser = foundUser;
              if ( currentUser.accessLevel == "consumer" ) {
                consumer = true;
              }
              return resolve( [ appContext as string, currentUser.accessLevel as string ].join( "-" ) );
            } );

        } );

      } )
      .then(( view: any ) => {

        let resolveActiveApp = new Promise<boolean>(( resolve, reject ) => {

          if ( consumer && finalAppContext != "core" ) {
            let matches = currentUser.activeApps.filter(( app ) => {
              return ( finalAppContext == app );
            } );
            return resolve(( matches.length ) ? false : true );
          } else {
            return resolve( false );
          }

        } );

        let resolveInnerContext = new Promise<string>(( resolve, reject ) => {
          if ( innerContext ) {
            return resolve( innerContext );
          }
          if ( req.query.innerContext ) {
            return resolve( req.query.innerContext );
          }
        } );

        return Promise.all( [ resolveActiveApp, resolveInnerContext ] )
          .then(( results: any ) => {

            return new Promise<interfaces.ContextsOutput>(( resolve, reject ) => {

              output.view = view;
              output.payload = {};

              if ( results[ 0 ] ) {
                output.view += "-join";
              }

              if ( results[ 1 ] ) {
                output.payload.innerContext = results[ 1 ];
              }

              resolve( output );

            } );

          } );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "Failed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/
