/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../interfaces";

import route_developer from "./developer";
import route_admin from "./admin";
import route_consumer from "./consumer";

/******************************************************************************/

export interface AuthChecks {
  developer: express.RequestHandler;
  admin: express.RequestHandler;
  consumer: express.RequestHandler;
}

export default ( app: express.Application, authChecks: AuthChecks, config: interfaces.Config ): any => {

  let router = express.Router();

  const developer = route_developer( app, authChecks.developer, config );
  const admin = route_admin( app, authChecks.admin, config );
  const consumer = route_consumer( app, authChecks.consumer, config );

  router.use( "/developer", developer );
  router.use( "/admin", admin );
  router.use( "/consumer", consumer );

}

/******************************************************************************/