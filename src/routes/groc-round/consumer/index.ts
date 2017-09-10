/******************************************************************************/

import * as express from "express";

/******************************************************************************/

export default (): express.Router => {

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