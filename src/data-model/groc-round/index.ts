/******************************************************************************/

import * as price from "./price";
import * as product from "./product";
import * as shop from "./shop";

/******************************************************************************/

export { price, product, shop };

/******************************************************************************/

export type ModelRange = price.Super | product.Super | shop.Super;
export type ModelArrayRange = price.Super[] | product.Super[] | shop.Super[];

/******************************************************************************/
