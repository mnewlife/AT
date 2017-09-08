/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as EventListener from "../../../../event-listener/interfaces";
import * as DataStructures from "../../../helpers/data-structures/interfaces";
import * as Moders from "../../../helpers/moders/interfaces";

import * as interfaces from "../../interfaces/core";

import event from "./event";
import subscription from "./subscription";
import user from "./user";

/******************************************************************************/

class Core implements interfaces.Instance {

  /*****************************************************************/

  constructor(
    readonly event: interfaces.event.Instance,
    readonly subscription: interfaces.subscription.Instance,
    readonly user: interfaces.user.Instance
  ) { }

  /*****************************************************************/

}

/******************************************************************************/

export default (
  emitEvent: EventListener.Emit,
  mapDetails: DataStructures.MapDetails,
  checkThrow: Moders.CheckThrow
): interfaces.Instance => {

  return new Core(
    event( emitEvent, mapDetails, checkThrow ),
    subscription( emitEvent, mapDetails, checkThrow ),
    user( emitEvent, mapDetails, checkThrow )
  );

};

/******************************************************************************/
