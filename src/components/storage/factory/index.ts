/******************************************************************************/

import * as EventListener from "../../../event-listener/interfaces";
import * as DataStructures from "../../helpers/data-structures/interfaces";
import * as Moders from "../../helpers/moders/interfaces";

import * as interfaces from "../interfaces";

/******************************************************************************/

export default (
  Storage: interfaces.Constructor,
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.ClassInstance => {

  return new Storage( emitEvent, mapDetails, checkThrow );

}

/******************************************************************************/
