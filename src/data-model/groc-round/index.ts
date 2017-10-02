/******************************************************************************/

import * as article from "./article";
import * as cart from "./cart";
import * as cartProduct from "./cart-product";
import * as contribution from "./contribution";
import * as deliveryFee from "./delivery-fee";
import * as product from "./product";
import * as round from "./round";
import * as roundContributor from "./round-contributor";
import * as shop from "./shop";
import * as track from "./track";
import * as trackProduct from "./track-product";

/******************************************************************************/

export {
  article, cart, cartProduct, contribution, deliveryFee, product, round,
  roundContributor, shop, track, trackProduct
};

/******************************************************************************/

export type ModelRange = article.Super | cart.Super | cartProduct.Super | product.Super | shop.Super
  | contribution.Super | deliveryFee.Super | round.Super | roundContributor.Super | track.Super
  | trackProduct.Super;
export type ModelArrayRange = article.Super[] | cart.Super[] | cartProduct.Super[] | product.Super[] | shop.Super[]
  | contribution.Super[] | deliveryFee.Super[] | round.Super[] | roundContributor.Super[] | track.Super[]
  | trackProduct.Super[];

/******************************************************************************/
