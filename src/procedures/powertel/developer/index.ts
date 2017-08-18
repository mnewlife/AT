/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as powertelInterfaces from "../../../src/procedures/powertel";

/******************************************************************************/

class Developer implements powertelInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): powertelInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

