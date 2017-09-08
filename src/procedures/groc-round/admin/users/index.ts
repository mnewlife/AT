/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/groc-round/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Users implements admin.Users {

  constructor(
    private readonly events: admin.users.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getUsers: storage.core.user.Get,
    private readonly getUserById: storage.core.user.GetById,
    private readonly removeUserById: storage.core.user.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.core.user.FiltrationCriteria, sortCriteria: storage.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.core.user.Super[]> => { }

  getOne = ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => { };

  remove = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getUsers: storage.core.user.Get,
  getUserById: storage.core.user.GetById,
  removeUserById: storage.core.user.RemoveById
} ): admin.Users => {
  return new Users(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getUsers,
    params.getUserById,
    params.removeUserById
  );
}

/******************************************************************************/