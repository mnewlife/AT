/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";

import cartProducts from "./cart-products";
import carts from "./carts";
import contributions from "./contributions";
import deliveryFees from "./delivery-fees";
import products from "./products";
import roundContributors from "./round-contributors";
import rounds from "./rounds";
import shops from "./shops";
import users from "./users";
import trackProducts from "./track-products";
import tracks from "./tracks";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  getAuthCheck: helpers.GetAuthCheck
): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.use( getAuthCheck( "admin", "grocRound-admin" ) );

  router.use( "/cartProducts", cartProducts(
    components.storage.grocRound.cartProduct.get,
    components.storage.grocRound.cartProduct.getById,
    components.storage.grocRound.cartProduct.add,
    components.storage.grocRound.cartProduct.updateById,
    components.storage.grocRound.cartProduct.removeById,
    components.response.send
  ) );

  router.use( "/carts", carts(
    components.storage.grocRound.cart.get,
    components.storage.grocRound.cart.getById,
    components.storage.grocRound.cart.updateById,
    components.response.send
  ) );

  router.use( "/contributions", contributions(
    components.storage.grocRound.contribution.get,
    components.storage.grocRound.contribution.getById,
    components.storage.grocRound.contribution.add,
    components.storage.grocRound.contribution.updateById,
    components.storage.grocRound.contribution.removeById,
    components.response.send
  ) );

  router.use( "/deliveryFees", deliveryFees(
    components.storage.grocRound.deliveryFee.get,
    components.storage.grocRound.deliveryFee.getById,
    components.storage.grocRound.deliveryFee.add,
    components.storage.grocRound.deliveryFee.updateById,
    components.storage.grocRound.deliveryFee.removeById,
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

  router.use( "/roundContributors", roundContributors(
    components.storage.grocRound.roundContributor.get,
    components.storage.grocRound.roundContributor.getById,
    components.storage.grocRound.roundContributor.add,
    components.storage.grocRound.roundContributor.updateById,
    components.storage.grocRound.roundContributor.removeById,
    components.response.send
  ) );

  router.use( "/rounds", rounds(
    components.storage.grocRound.round.get,
    components.storage.grocRound.round.getById,
    components.storage.grocRound.round.add,
    components.storage.grocRound.round.updateById,
    components.storage.grocRound.round.removeById,
    components.response.send
  ) );

  router.use( "/shops", shops(
    components.storage.grocRound.shop.get,
    components.storage.grocRound.shop.getById,
    components.storage.grocRound.shop.add,
    components.storage.grocRound.shop.updateById,
    components.storage.grocRound.shop.removeById,
    components.response.send
  ) );

  router.use( "/trackProducts", trackProducts(
    components.storage.grocRound.trackProduct.get,
    components.storage.grocRound.trackProduct.getById,
    components.storage.grocRound.trackProduct.add,
    components.storage.grocRound.trackProduct.updateById,
    components.storage.grocRound.trackProduct.removeById,
    components.response.send
  ) );

  router.use( "/tracks", tracks(
    components.storage.grocRound.track.get,
    components.storage.grocRound.track.getById,
    components.storage.grocRound.track.add,
    components.storage.grocRound.track.updateById,
    components.storage.grocRound.track.removeById,
    components.response.send
  ) );

  router.use( "/users", users(
    components.storage.core.user.get,
    components.storage.core.user.getById,

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
