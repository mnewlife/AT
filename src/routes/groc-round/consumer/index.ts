/******************************************************************************/

import * as express from "express";
import * as src from "../../../src";

/******************************************************************************/

export default ( config: src.Config ): express.Router => {

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