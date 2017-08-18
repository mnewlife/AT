/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";
import * as moders from "../moders/interfaces";

import * as interfaces from "./interfaces";

import Canon from "./canon";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default ( emitEvent: eventListener.Emit, checkThrow: moders.CheckThrow ): interfaces.ClassInstance => {
  return factory( Canon, new Events( emitEvent ), checkThrow );
}

/******************************************************************************/
