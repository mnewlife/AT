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

export interface Instance {
  readonly article: article.Instance;
  readonly cart: cart.Instance;
  readonly cartProduct: cartProduct.Instance;
  readonly contribution: contribution.Instance;
  readonly deliveryFee: deliveryFee.Instance;
  readonly product: product.Instance;
  readonly round: round.Instance;
  readonly roundContributor: roundContributor.Instance;
  readonly shop: shop.Instance;
  readonly track: track.Instance;
  readonly trackProduct: trackProduct.Instance;
}

/******************************************************************************/