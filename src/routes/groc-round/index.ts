/******************************************************************************/

import * as express from "express";
import * as src from "../../src";

import developerRoutes from "./developer";
import adminRoutes from "./admin";
import consumerRoutes from "./consumer";

/******************************************************************************/

export default ( config: src.Config ): any => {

  let router = express.Router();

  router.use( "/developer", developerRoutes( config ) );
  router.use( "/admin", adminRoutes( config ) );
  router.use( "/consumer", consumerRoutes( config ) );

}

/******************************************************************************/