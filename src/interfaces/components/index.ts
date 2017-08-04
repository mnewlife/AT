/******************************************************************************/

import * as core from "./core";
import * as orders from "./orders";

/******************************************************************************/

export { core, orders };

/******************************************************************************/

export interface Core {
  developer: core.Developer;
  admin: core.Admin;
  logistics: core.Logistics;
  salesRep: core.SalesRep;
}

export interface Orders {
  developer: orders.Developer;
  admin: orders.Admin;
  logistics: orders.Logistics;
  salesRep: orders.SalesRep;
}

/******************************************************************************/
