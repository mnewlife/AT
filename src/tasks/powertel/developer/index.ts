/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as powertelInterfaces from "../../../interfaces/tasks/powertel";

/******************************************************************************/

class Developer implements powertelInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): powertelInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

