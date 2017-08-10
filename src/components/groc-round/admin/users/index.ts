/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Users implements adminInterfaces.Users {

  constructor(
    private readonly emitter: adminInterfaces.users.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getUsers: storageManagerInterfaces.core.user.Get,
    private readonly getUserById: storageManagerInterfaces.core.user.GetById,
    private readonly removeUserById: storageManagerInterfaces.core.user.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria, sortCriteria: storageManagerInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]> => { }

  getOne = ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super> => { };

  remove = ( userId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getUsers: storageManagerInterfaces.core.user.Get,
  getUserById: storageManagerInterfaces.core.user.GetById,
  removeUserById: storageManagerInterfaces.core.user.RemoveById
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