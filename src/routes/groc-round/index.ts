/******************************************************************************/

import * as express from "express";

import * as EventListener from "../../event-listener/interfaces";
import * as Components from "../../components/interfaces";
import * as Procedures from "../../procedures/interfaces";

import * as helpers from "../helpers/interfaces";

//import developer from "./developer";
import admin from "./admin";
//import consumer from "./consumer";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: helpers.Instance
): express.Router => {

  let router = express.Router();

  //router.use( "/developer", developer( config ) );
  router.use( "/admin", admin( components, procedures, helpers.getAuthCheck ) );
  //router.use( "/consumer", consumer( components, procedures, helpers ) );

  return router;

}

/******************************************************************************/