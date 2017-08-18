/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as powertelInterfaces from "../../../src/procedures/powertel";

/******************************************************************************/

class Consumer implements powertelInterfaces.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): powertelInterfaces.Consumer => {
  return new Consumer();
}

/******************************************************************************/

