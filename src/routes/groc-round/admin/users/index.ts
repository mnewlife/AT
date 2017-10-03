/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";

import * as dataModel from "../../../../data-model";

import * as response from "../../../../components/response/interfaces";
import * as storageUser from "../../../../components/storage/interfaces/core/user";

/******************************************************************************/

export default (
  findUsers: storageUser.Instance[ "get" ],
  findUserById: storageUser.Instance[ "getById" ],
  sendResponse: response.Send
): express.Router => {

  /*********************************************************/

  let router = express.Router();

  router.get( "/getUsers", getUsers );
  router.get( "/getUser/:userId", getUser );

  /*********************************************************/

  function getUsers ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-users";

    return findUsers( null, null, null )
      .then( ( foundUsers: dataModel.core.user.Super[] ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundUsers: foundUsers,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  function getUser ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    let innerContext: string = "get-user";

    if ( !req.params.userId ) {
      return sendResponse( res, "grocRound-admin", false, "User ID is missing", {
        innerContext: innerContext
      } );
    }

    return findUserById( req.params.userId )
      .then( ( foundUser: dataModel.core.user.Super ) => {

        return sendResponse( res, "grocRound-admin", true, null, {
          foundUser: foundUser,
          innerContext: innerContext
        } );

      } )
      .catch( ( reason: any ) => {

        if ( reason && reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return sendResponse( res, "grocRound-admin", false, "Couldn't find user", {
            innerContext: innerContext
          } );
        }

        return sendResponse( res, "grocRound-admin", false, null, {
          innerContext: innerContext
        } );

      } );

  }

  /*********************************************************/

  return router;

}

/******************************************************************************/