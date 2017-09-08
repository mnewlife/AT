/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as routers from "../../../src/procedures/routers";

/******************************************************************************/

class Developer implements routers.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): routers.Developer => {
  return new Developer();
}

/******************************************************************************/

