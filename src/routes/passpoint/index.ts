/******************************************************************************/

import * as express from "express";

import * as Components from "../../components/interfaces";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

/******************************************************************************/

export default ( components: Components.Instance ): express.Router => {

  let router = express.Router();

  router.use( "/developer", developer( components.response.send ) );
  router.use( "/admin", admin( components.response.send ) );
  router.use( "/consumer", consumer( components.response.send ) );

  return router;

}

/******************************************************************************/