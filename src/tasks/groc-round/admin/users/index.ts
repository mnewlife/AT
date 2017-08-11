/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/groc-round/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Users implements adminInterfaces.Users {

  constructor(
    private readonly emitter: adminInterfaces.users.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getUsers: storageInterfaces.core.user.Get,
    private readonly getUserById: storageInterfaces.core.user.GetById,
    private readonly removeUserById: storageInterfaces.core.user.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.core.user.FiltrationCriteria, sortCriteria: storageInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]> => { }

  getOne = ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super> => { };

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
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getUsers,
    params.getUserById,
    params.removeUserById
  );
}

/******************************************************************************/