/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as call263Interfaces from "../../../src/procedures/call-263";

/******************************************************************************/

class Developer implements call263Interfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): call263Interfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

