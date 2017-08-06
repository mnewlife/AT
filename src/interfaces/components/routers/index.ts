/******************************************************************************/

import * as developer from "./developer";
import * as admin from "./admin";
import * as consumer from "./consumer";

/******************************************************************************/

export { developer, admin, consumer };

/******************************************************************************/

export interface Developer { }

export interface Admin {
  readonly amounts: admin.Amounts;
  readonly newRouterStock: admin.NewRouterStock;
  readonly sales: admin.Sales;
}

export interface Consumer { }

/******************************************************************************/
