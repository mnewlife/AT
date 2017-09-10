/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";
import * as authProcedures from "../../../procedures/core/common/auth/interfaces";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: helpers.Instance
): express.Router => {

  let router = express.Router();
  //router.use( authCheck );

  /*
  function authCheck () {

  }
  */

  return router;

}

/******************************************************************************/