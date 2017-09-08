/******************************************************************************/

import * as eventListener from "../event-listener/interfaces";
import * as components from "../components/interfaces";

import * as Core from "./core/interfaces";
import core from "./core";

import * as interfaces from "./interfaces";

/******************************************************************************/

class Procedures implements interfaces.Instance {
  constructor( readonly core: Core.Instance ) { }
}

/******************************************************************************/

export default ( emitEvent: eventListener.Emit, components: components.Instance ): interfaces.Instance => {
  return new Procedures( core( emitEvent, components ) );
}

/******************************************************************************/