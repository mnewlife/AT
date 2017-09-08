/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as grocRound from "../../../src/procedures/groc-round";

import user from "./user";

/******************************************************************************/

class Consumer implements grocRound.Consumer {
  constructor(
    readonly user: grocRound.consumer.User,
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): grocRound.Consumer => {
  return new Consumer(
    userFactory( {
      emitEvent: config.eventListener.emit,
      checkThrow: config.components.sharedLogic.moders.checkThrow,
      updateUserById: config.components.storage.core.user.updateById
    } )
  );
}

/******************************************************************************/