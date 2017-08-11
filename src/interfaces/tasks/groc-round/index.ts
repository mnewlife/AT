/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer { }

export interface Admin {
  readonly prices: admin.Prices;
  readonly products: admin.Products;
  readonly shops: admin.Shops;
  readonly users: admin.Users;
}

export interface Consumer {
  readonly user: consumer.User;
}

/******************************************************************************/
