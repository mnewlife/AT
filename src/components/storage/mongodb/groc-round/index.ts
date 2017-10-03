/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/groc-round";

import article from "./article";
import cart from "./cart";
import cartProduct from "./cart-product";
import contribution from "./contribution";
import deliveryFee from "./delivery-fee";
import product from "./product";
import round from "./round";
import roundContributor from "./round-contributor";
import shop from "./shop";
import track from "./track";
import trackProduct from "./track-product";

/******************************************************************************/

class GrocRound implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    readonly article: interfaces.article.Instance,
    readonly cart: interfaces.cart.Instance,
    readonly cartProduct: interfaces.cartProduct.Instance,
    readonly contribution: interfaces.contribution.Instance,
    readonly deliveryFee: interfaces.deliveryFee.Instance,
    readonly product: interfaces.product.Instance,
    readonly round: interfaces.round.Instance,
    readonly roundContributor: interfaces.roundContributor.Instance,
    readonly shop: interfaces.shop.Instance,
    readonly track: interfaces.track.Instance,
    readonly trackProduct: interfaces.trackProduct.Instance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.Instance => {

  return new GrocRound(
    article( emitEvent, mapDetails, checkThrow ),
    cart( emitEvent, mapDetails, checkThrow ),
    cartProduct( emitEvent, mapDetails, checkThrow ),
    contribution( emitEvent, mapDetails, checkThrow ),
    deliveryFee( emitEvent, mapDetails, checkThrow ),
    product( emitEvent, mapDetails, checkThrow ),
    round( emitEvent, mapDetails, checkThrow ),
    roundContributor( emitEvent, mapDetails, checkThrow ),
    shop( emitEvent, mapDetails, checkThrow ),
    track( emitEvent, mapDetails, checkThrow ),
    trackProduct( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
