/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../interfaces";

/******************************************************************************/

export default ( app: express.Application, authCheck: express.RequestHandler, config: interfaces.Config ): any => {

  let router = express.Router();
  router.use( authCheck );

  router.get( "/", example );

  function example ( req: express.Request, res: express.Response, next: express.NextFunction ) {

  }

}

/******************************************************************************/