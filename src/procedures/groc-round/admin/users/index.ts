/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/groc-round/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Users implements adminInterfaces.Users {

  constructor(
    private readonly events: adminInterfaces.users.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getUsers: storageInterfaces.core.user.Get,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly removeUserById: storageInterfaces.core.user.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.core.user.FiltrationCriteria, sortCriteria: storageInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.core.user.Super[]> => { }

  getOne = ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super> => { };

  remove = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getUsers: storageInterfaces.core.user.Get,
  getUserById: storageInterfaces.core.user.GetById,
  removeUserById: storageInterfaces.core.user.RemoveById
} ): adminInterfaces.Users => {
  return new Users(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getUsers,
    params.getUserById,
    params.removeUserById
  );
}

/******************************************************************************/