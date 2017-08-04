/******************************************************************************/

import * as interfaces from "../../../../interfaces/index";

import * as cartProducts from "./cart-products/index";
import * as carts from "./carts/index";
import * as contributions from "./contributions/index";
import * as deliveryFees from "./delivery-fees/index";
import * as products from "./products/index";
import * as rounds from "./rounds/index";
import * as shops from "./shops/index";
import * as trackProducts from "./track-products/index";
import * as tracks from "./tracks/index";
import * as users from "./users/index";

import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { cartProducts, carts, contributions, deliveryFees, products };
export { rounds, shops, trackProducts, tracks, users, sharedCode };

/******************************************************************************/

export interface Params {
  cartProducts: CartProducts;
  carts: Carts;
  contributions: Contributions;
  deliveryFees: DeliveryFees;
  products: Products;
  rounds: Rounds;
  shops: Shops;
  trackProducts: TrackProducts;
  tracks: Tracks;
  users: Users;
}

export interface CartProducts {
}

export interface Carts {
}

export interface Contributions {
}

export interface DeliveryFees {
}

export interface Products {
}

export interface Rounds {
}

export interface Shops {
}

export interface TrackProducts {
}

export interface Tracks {
}

export interface Users {
}

export interface SharedCode {
}

/******************************************************************************/
