/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as grocRound from "../../../src/procedures/groc-round";

/******************************************************************************/

class Developer implements grocRound.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): grocRound.Developer => {
  return new Developer();
}

/******************************************************************************/

