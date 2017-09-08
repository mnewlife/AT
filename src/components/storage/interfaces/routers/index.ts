/******************************************************************************/

import * as amounts from "./amounts";
import * as newRouterStock from "./new-router-stock";
import * as sale from "./sale";

/******************************************************************************/

export { amounts, newRouterStock, sale };

/******************************************************************************/

export interface Instance {
  readonly amounts: amounts.Instance;
  readonly newRouterStock: newRouterStock.Instance;
  readonly sale: sale.Instance;
}

/******************************************************************************/