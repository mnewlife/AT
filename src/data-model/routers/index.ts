/******************************************************************************/

import * as amounts from "./amounts";
import * as newRouterStock from "./new-router-stock";
import * as sale from "./sale";

/******************************************************************************/

export { amounts, newRouterStock, sale };

/******************************************************************************/

export type ModelRange = amounts.Super | newRouterStock.Super | sale.Super;
export type ModelArrayRange = amounts.Super[] | newRouterStock.Super[] | sale.Super[];

/******************************************************************************/
