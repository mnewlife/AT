/******************************************************************************/

import * as amounts from "./amounts";
import * as newRouterStock from "./new-router-stock";
import * as sales from "./sales";

/******************************************************************************/

export { amounts, newRouterStock, sales };

/******************************************************************************/

export interface Amounts {
  readonly get: amounts.Get;
  readonly getOne: amounts.GetOne;
  readonly add: amounts.Add;
  readonly update: amounts.Update;
  readonly remove: amounts.Remove;
}

export interface NewRouterStock {
  readonly get: newRouterStock.Get;
  readonly getOne: newRouterStock.GetOne;
  readonly add: newRouterStock.Add;
  readonly update: newRouterStock.Update;
  readonly remove: newRouterStock.Remove;
}

export interface Sales {
  readonly get: sales.Get;
  readonly getOne: sales.GetOne;
  readonly makeTransfer: sales.Add;
  readonly update: sales.Update;
  readonly remove: sales.Remove;
}

/******************************************************************************/
