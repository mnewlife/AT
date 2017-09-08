/******************************************************************************/

import * as price from "./price";
import * as product from "./product";
import * as shop from "./shop";

/******************************************************************************/

export { price, product, shop };

/******************************************************************************/

export interface Instance {
  readonly price: price.Instance;
  readonly product: product.Instance;
  readonly shop: shop.Instance;
}

/******************************************************************************/