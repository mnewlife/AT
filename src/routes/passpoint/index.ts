/******************************************************************************/

import * as express from "express";

import * as Components from "../../components/interfaces";

/******************************************************************************/

export default ( components: Components.Instance ): express.Router => {

  let router = express.Router();

  router.get( "/", ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    let payload: any = {};

    if ( req.query.appContext ) {
      payload.appContext = req.query.appContext;
    }

    if ( req.query.innerContext ) {
      payload.innerContext = req.query.innerContext;
    }

    return components.response.send( res, "passpoint", true, null, payload );

  } );

  return router;

}

/******************************************************************************/