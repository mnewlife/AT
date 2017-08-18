/******************************************************************************/

import * as price from "./price";
import * as product from "./product";
import * as shop from "./shop";

/******************************************************************************/

export { price, product, shop };

/******************************************************************************/

export interface ClassInstance {
  readonly price: price.ClassInstance;
  readonly product: product.ClassInstance;
  readonly shop: shop.ClassInstance;
}

/******************************************************************************/