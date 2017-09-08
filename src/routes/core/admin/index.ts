/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

/******************************************************************************/

export default (
  eventListener: EventListener.Instance,
  components: Components.Instance,
  procedures: Procedures.Instance
): express.Router => {

  let router = express.Router();
  router.use( authCheck );

  router.get( "/", example );

  function example ( req: express.Request, res: express.Response, next: express.NextFunction ) {

  }

  function authCheck () {

  }

  return router;

}

/******************************************************************************/