/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as powertel from "../../../src/procedures/powertel";

/******************************************************************************/

class Consumer implements powertel.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): powertel.Consumer => {
  return new Consumer();
}

/******************************************************************************/

