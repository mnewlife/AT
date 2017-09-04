/******************************************************************************/

import * as moders from "../../helpers/moders/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";

import * as interfaces from "../interfaces";
import * as events from "../events/interfaces";

/******************************************************************************/

export default ( Response: interfaces.Constructor, events: events.ClassInstance ): interfaces.ClassInstance => {
  return new Response( events );
}

/******************************************************************************/
