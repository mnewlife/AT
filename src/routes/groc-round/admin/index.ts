/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";

import shops from "./shops";
import products from "./products";
import prices from "./prices";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  getAuthCheck: helpers.GetAuthCheck
): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.use( "/shops", shops(
    components.storage.grocRound.shop.get,
    components.storage.grocRound.shop.getById,
    components.storage.grocRound.shop.add,
    components.storage.grocRound.shop.updateById,
    components.storage.grocRound.shop.removeById,
    components.response.send
  ) );

  router.use( "/products", products(
    components.storage.grocRound.product.get,
    components.storage.grocRound.product.getById,
    components.storage.grocRound.product.add,
    components.storage.grocRound.product.updateById,
    components.storage.grocRound.product.removeById,
    components.response.send
  ) );

  router.use( "/prices", prices(
    components.storage.grocRound.price.get,
    components.storage.grocRound.price.getById,
    components.storage.grocRound.price.add,
    components.storage.grocRound.price.updateById,
    components.storage.grocRound.price.removeById,
    components.response.send
  ) );

  /**********************************************************/

  router.get( "/", getAuthCheck( "admin", "grocRound-admin" ),
  ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    return components.response.send( res, "grocRound-admin", true, null, {
      currentUser: res.locals.currentUser
    } );

  } );

  /**********************************************************/

  return router;

}

/******************************************************************************/
