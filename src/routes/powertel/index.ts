/******************************************************************************/

import * as express from "express";
import * as interfaces from "../../interfaces";

import developerRoutes from "./developer";
import adminRoutes from "./admin";
import consumerRoutes from "./consumer";

/******************************************************************************/

export default ( config: interfaces.Config ): any => {

  let router = express.Router();

  router.use( "/developer", developerRoutes( config ) );
  router.use( "/admin", adminRoutes( config ) );
  router.use( "/consumer", consumerRoutes( config ) );

}

/******************************************************************************/