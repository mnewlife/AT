/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../interfaces";

import call263Routes from "./call-263";
import coreRoutes from "./core";
import grocRoundRoutes from "./groc-round";
import powertelRoutes from "./powertel";
import routersRoutes from "./routers";

/******************************************************************************/

export default function routes ( config: interfaces.Config, app: express.Application ): void {

  /**********************************************************/

  let responseManager = config.utilities.responseManager;
  let sessionManager = config.utilities.sessionManager;

  /**********************************************************/

  app.use( "/call263", call263Routes( config ) );
  app.use( "/core", coreRoutes( config ) );
  app.use( "/grocRound", grocRoundRoutes( config ) );
  app.use( "/powertel", powertelRoutes( config ) );
  app.use( "/routers", routersRoutes( config ) );

  /**********************************************************/

  app.get( "/", function ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let payload: any = {};

    return new Promise<void>(( resolve, reject ) => {

      if ( req.query.extraData ) {
        return resolve( JSON.parse( req.query.extraData ) );
      } else {
        return resolve();
      }

    } )
      .then(( extraData: any ) => {

        return new Promise<void>(( resolve, reject ) => {
          for ( let dataItem in extraData ) {
            if ( extraData.hasOwnProperty( dataItem ) ) {
              payload[ dataItem ] = extraData[ dataItem ];
            }
          }
          resolve();
        } );

      } )
      .catch(( reason: any ) => {

        console.log( "\n" + ">>> PRIMARY ROUTE ERROR -> " + reason );

      } )
      .then(( extraData: any ) => {

        if ( req.session.userId ) {

          return sessionManager.getCurrentUser( req )
            .then(( currentUser: interfaces.dataModel.core.user.Super ) => {

              payload.currentUser = currentUser;
              responseManager.send( res, "passpoint", null, null, payload );

            } );

        } else {

          responseManager.send( res, "passpoint", null, null, payload );

        }

      } )
      .catch(( reason: any ) => {

        console.log( "\n" + ">>> PRIMARY ROUTE ERROR -> " + reason );

      } );

  } );

  /**********************************************************/

}

/******************************************************************************/
