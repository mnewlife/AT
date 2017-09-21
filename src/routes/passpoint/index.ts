/******************************************************************************/

import * as express from "express";

import * as Components from "../../components/interfaces";
import * as response from "../../components/response/interfaces";
import * as helpers from "../helpers/interfaces";

/******************************************************************************/

export default (
  sendResponse: response.Send,
  validateAppContext: helpers.ValidateAppContext
): express.Router => {

  let router = express.Router();

  router.get( "/", ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    let payload: any = {};

    if ( req.query.appContext ) {
      if ( validateAppContext( req.query.appContext ) ) {
        payload.appContext = req.query.appContext;
      }
    }

    if ( req.query.nextInnerContext ) {
      payload.nextInnerContext = req.query.nextInnerContext;
    }

    return sendResponse( res, "passpoint", true, null, payload );

  } );

  return router;

}

/******************************************************************************/