/******************************************************************************/

import * as express from "express";

import * as EventListener from "../../event-listener/interfaces";
import * as Components from "../../components/interfaces";
import * as Procedures from "../../procedures/interfaces";

import * as Helpers from "../helpers/interfaces";

import developer from "./developer";
import admin from "./admin";
import consumer from "./consumer";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: Helpers.Instance
): express.Router => {

  let router = express.Router();

  //router.use( "/developer", developer( config ) );
  router.use( "/admin", admin( eventListener, components, procedures, helpers ) );
  //router.use( "/consumer", consumer( config ) );

  return router;

}

/******************************************************************************/