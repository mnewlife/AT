/******************************************************************************/

import * as EventListener from "../../event-listener/interfaces";
import * as DataStructures from "../helpers/data-structures/interfaces";
import * as Moders from "../helpers/moders/interfaces";

import * as interfaces from "./interfaces";

import MongoDB from "./mongodb";

import factory from "./factory";

/******************************************************************************/

export default ( emitEvent: EventListener.Emit, mapDetails: DataStructures.MapDetails, checkThrow: Moders.CheckThrow ): interfaces.ClassInstance => {
  return factory( MongoDB, emitEvent, mapDetails, checkThrow );
}

/******************************************************************************/
