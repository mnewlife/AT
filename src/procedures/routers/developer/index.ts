/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as routersInterfaces from "../../../src/procedures/routers";

/******************************************************************************/

class Developer implements routersInterfaces.Developer {

  constructor( ) { }

}

/******************************************************************************/

export default ( config: src.Config ): routersInterfaces.Developer => {
  return new Developer();
}

/******************************************************************************/

