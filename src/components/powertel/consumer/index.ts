/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as powertelInterfaces from "../../../interfaces/components/powertel";

/******************************************************************************/

class Consumer implements powertelInterfaces.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): powertelInterfaces.Consumer => {
  return new Consumer();
}

/******************************************************************************/

