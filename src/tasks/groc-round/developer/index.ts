/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../interfaces/tasks/groc-round";

/******************************************************************************/

class Developer implements grocRoundInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): grocRoundInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

