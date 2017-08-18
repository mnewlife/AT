/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as consumerInterfaces from "../../../../src/procedures/groc-round/consumer";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class User implements consumerInterfaces.User {

  constructor(
    private readonly events: consumerInterfaces.user.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly updateUserById: storageInterfaces.core.user.UpdateById
  ) { }

  join = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  updateUserById: storageInterfaces.core.user.UpdateById
} ): consumerInterfaces.User => {
  return new User(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.updateUserById
  );
}

/******************************************************************************/