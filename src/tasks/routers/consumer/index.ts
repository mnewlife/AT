/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as routersInterfaces from "../../../interfaces/tasks/routers";

/******************************************************************************/

class Consumer implements routersInterfaces.Consumer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: interfaces.Config ): routersInterfaces.Consumer => {
  return new Consumer();
}

/******************************************************************************/

