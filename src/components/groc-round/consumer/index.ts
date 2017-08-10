/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../interfaces/components/groc-round";

import userFactory from "./user";

/******************************************************************************/

class Consumer implements grocRoundInterfaces.Consumer {
  constructor(
    readonly user: grocRoundInterfaces.consumer.User,
  ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): grocRoundInterfaces.Consumer => {
  return new Consumer(
    userFactory( {
      emitEvent: config.eventManager.emit,
      checkThrow: config.utilities.sharedLogic.moders.checkThrow,
      updateUserById: config.utilities.storageManager.core.user.updateById
    } )
  );
}

/******************************************************************************/