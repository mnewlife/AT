/******************************************************************************/

import * as express from "express";

import * as interfaces from "../interfaces";

import route_core from "./core";
import route_call263 from "./call-263";
import route_grocRound from "./groc-round";

import authChecks from "./auth-checks";

/******************************************************************************/

export default function routes ( config: interfaces.Config, app: express.Application ): void {

  let responseManager = config.utilities.responseManager;

  const core = route_core( app, authChecks.core, config );
  const call263 = route_call263( app, authChecks.call263, config );
  const grocRound = route_grocRound( app, authChecks.grocRound, config );

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

  app.use( "/core", core );
  app.use( "/call263", call263 );
  app.use( "/grocRound", grocRound );

}

/******************************************************************************/
