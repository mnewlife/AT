/******************************************************************************/

import * as interfaces from "../../../interfaces/index";

import * as developer from "./developer/index";
import * as admin from "./admin/index";
import * as consumer from "./consumer/index";
import * as sharedCode from "./shared-code/index";

/******************************************************************************/

export { developer, admin, consumer, sharedCode };

/******************************************************************************/

export interface Params {
  developer: Developer;
  admin: Admin;
  consumer: Consumer;
}

export interface Developer {
  readonly cartProducts: developer.CartProducts;
  readonly carts: developer.Carts;
  readonly contributions: developer.Contributions;
  readonly deliveryFees: developer.DeliveryFees;
  readonly products: developer.Products;
  readonly rounds: developer.Rounds;
  readonly shops: developer.Shops;
  readonly trackProducts: developer.TrackProducts;
  readonly tracks: developer.Tracks;
  readonly users: developer.Users;
};

export interface Admin {
  readonly cartProducts: admin.CartProducts;
  readonly carts: admin.Carts;
  readonly contributions: admin.Contributions;
  readonly deliveryFees: admin.DeliveryFees;
  readonly products: admin.Products;
  readonly rounds: admin.Rounds;
  readonly shops: admin.Shops;
  readonly trackProducts: admin.TrackProducts;
  readonly tracks: admin.Tracks;
  readonly users: admin.Users;
}

export interface Consumer {
  readonly cart: consumer.Cart;
  readonly cartProducts: consumer.CartProducts;
  readonly contributions: consumer.Contributions;
  readonly deliveryFees: consumer.DeliveryFees;
  readonly products: consumer.Products;
  readonly rounds: consumer.Rounds;
  readonly trackProducts: consumer.TrackProducts;
  readonly tracks: consumer.Tracks;
}

export interface SharedCode { }

/******************************************************************************/
