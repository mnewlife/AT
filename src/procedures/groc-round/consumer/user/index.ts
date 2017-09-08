/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as consumer from "../../../../src/procedures/groc-round/consumer";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class User implements consumer.User {

  constructor(
    private readonly events: consumer.user.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly updateUserById: storage.core.user.UpdateById
  ) { }

  join = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,
  updateUserById: storage.core.user.UpdateById
} ): consumer.User => {
  return new User(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.updateUserById
  );
}

/******************************************************************************/