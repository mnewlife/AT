/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as routersInterfaces from "../../../src/procedures/routers";

/******************************************************************************/

class Consumer implements routersInterfaces.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): routersInterfaces.Consumer => {
  return new Consumer();
}

/******************************************************************************/

