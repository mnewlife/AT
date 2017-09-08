/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as call263 from "../../../src/procedures/call-263";

/******************************************************************************/

class Developer implements call263.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): call263.Developer => {
  return new Developer();
}

/******************************************************************************/

