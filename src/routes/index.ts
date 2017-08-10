/******************************************************************************/

import * as express from "express";

import * as interfaces from "../interfaces";

import call263Routes from "./call-263";
import coreRoutes from "./core";
import grocRoundRoutes from "./groc-round";
import powertelRoutes from "./powertel";
import routersRoutes from "./routers";

import authChecks from "./auth-checks";

/******************************************************************************/

export default function routes ( config: interfaces.Config, app: express.Application ): void {

  let responseManager = config.utilities.responseManager;

  app.use( "/call263", call263Routes( config ) );
  app.use( "/core", coreRoutes( config ) );
  app.use( "/grocRound", grocRoundRoutes( config ) );
  app.use( "/powertel", powertelRoutes( config ) );
  app.use( "/routers", routersRoutes( config ) );

  app.get( "/", function ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let payload: any = {};

    if ( req.query.extraData ) {

      let extraData: any = {};
      try {
        extraData = JSON.parse( req.query.extraData );
      } catch ( ex ) {
        extraData = {};
        console.log( "\n" + ">>> JSON PARSE ERROR -> " + ex );
      }

      for ( let dataItem in extraData ) {
        if ( extraData.hasOwnProperty( dataItem ) ) {
          payload[ dataItem ] = extraData[ dataItem ];
        }
      }

    }

    if ( req.session.currentUser ) {
      payload.currentUser = req.session.currentUser;
    }

    return responseManager.send( res, "passpoint", null, null, payload );

  } );

}

/******************************************************************************/
