/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as call263Interfaces from "../../../interfaces/components/call-263";

/******************************************************************************/

class Developer implements call263Interfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): call263Interfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

