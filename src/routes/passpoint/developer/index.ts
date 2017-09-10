/******************************************************************************/

import * as express from "express";

import * as response from "../../../components/response/interfaces";

/******************************************************************************/

export default ( sendResponse: response.Send ): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.get( "/", ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    let payload: any = {};

    if ( req.query.appContext ) {
      payload.appContext = req.query.appContext;
    }

    if ( req.query.innerContext ) {
      payload.innerContext = req.query.innerContext;
    }

    return sendResponse( res, "passpoint-developer", true, null, payload );

  } );

  /**********************************************************/

  return router;

}

/******************************************************************************/