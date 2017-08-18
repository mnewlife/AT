/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../src/procedures/groc-round";

import userFactory from "./user";

/******************************************************************************/

class Consumer implements grocRoundInterfaces.Consumer {
  constructor(
    readonly user: grocRoundInterfaces.consumer.User,
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): grocRoundInterfaces.Consumer => {
  return new Consumer(
    userFactory( {
      emitEvent: config.eventManager.emit,
      checkThrow: config.components.sharedLogic.moders.checkThrow,
      updateUserById: config.components.storage.core.user.updateById
    } )
  );
}

/******************************************************************************/