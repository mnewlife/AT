/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as routers from "../../../src/procedures/routers";

/******************************************************************************/

class Consumer implements routers.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): routers.Consumer => {
  return new Consumer();
}

/******************************************************************************/

