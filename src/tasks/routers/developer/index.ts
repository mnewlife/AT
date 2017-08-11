/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as routersInterfaces from "../../../interfaces/tasks/routers";

/******************************************************************************/

class Developer implements routersInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): routersInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

