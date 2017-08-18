/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../src/procedures/groc-round";

/******************************************************************************/

class Developer implements grocRoundInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): grocRoundInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

