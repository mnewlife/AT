/******************************************************************************/

import * as amounts from "./amounts";
import * as newRouterStock from "./new-router-stock";
import * as sale from "./sale";

/******************************************************************************/

export { amounts, newRouterStock, sale };

/******************************************************************************/

export interface ClassInstance {
  readonly amounts: amounts.ClassInstance;
  readonly newRouterStock: newRouterStock.ClassInstance;
  readonly sale: sale.ClassInstance;
}

/******************************************************************************/