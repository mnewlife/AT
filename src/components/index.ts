/******************************************************************************/

import * as interfaces from "../interfaces";

import coreFactory from "./core";
import ordersFactory from "./orders";

/******************************************************************************/

class Components implements interfaces.Components {

  readonly core: interfaces.components.Core;
  readonly orders: interfaces.components.Orders;

  constructor( core: interfaces.components.Core, orders: interfaces.components.Orders ) {
    this.core = core;
    this.orders = orders;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.Components => {
  return new Components(
    coreFactory( config ),
    ordersFactory( config )
  );
}

/******************************************************************************/
