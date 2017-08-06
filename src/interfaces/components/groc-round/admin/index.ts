/******************************************************************************/

import * as prices from "./prices";
import * as products from "./products";
import * as shops from "./shops";
import * as users from "./users";

/******************************************************************************/

export { prices, products, shops, users };

/******************************************************************************/

export interface Prices {
  readonly get: prices.Get;
  readonly getOne: prices.GetOne;
  readonly add: prices.Add;
  readonly update: prices.Update;
  readonly remove: prices.Remove;
}

export interface Products {
  readonly get: products.Get;
  readonly getOne: products.GetOne;
  readonly add: products.Add;
  readonly update: products.Update;
  readonly remove: products.Remove;
}

export interface Shops {
  readonly get: shops.Get;
  readonly getOne: shops.GetOne;
  readonly makeTransfer: shops.Add;
  readonly update: shops.Update;
  readonly remove: shops.Remove;
}

export interface Users {
  readonly get: users.Get;
  readonly getOne: users.GetOne;
  readonly remove: users.Remove;
}

/******************************************************************************/

