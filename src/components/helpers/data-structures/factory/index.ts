/******************************************************************************/

import * as moders from "../../moders/interfaces";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default (
  DataStructures: interfaces.Constructor,
  events: events.Instance,
  checkThrow: moders.CheckThrow
): interfaces.Instance => {

  return new DataStructures( events, checkThrow );

}

/******************************************************************************/
