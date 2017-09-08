/******************************************************************************/

import * as eventListener from "../../event-listener/interfaces";
import * as moders from "../helpers/moders/interfaces";
import * as storageUser from "../storage/interfaces/core/user";

import * as interfaces from "./interfaces";

import Canon from "./canon";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default ( emitEvent: eventListener.Emit ): interfaces.Instance => {
  return factory( Canon, new Events( emitEvent ) );
}

/******************************************************************************/
