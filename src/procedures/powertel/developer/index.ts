/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as powertel from "../../../src/procedures/powertel";

/******************************************************************************/

class Developer implements powertel.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): powertel.Developer => {
  return new Developer();
}

/******************************************************************************/

