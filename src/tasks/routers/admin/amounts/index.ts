/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/routers/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Amounts implements adminInterfaces.Amounts {

  constructor(
    private readonly emitter: adminInterfaces.amounts.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAmounts: storageInterfaces.routers.amounts.Get,
    private readonly getAmountsById: storageInterfaces.routers.amounts.GetById,
    private readonly addNewAmounts: storageInterfaces.routers.amounts.Add,
    private readonly updateAmountsById: storageInterfaces.routers.amounts.UpdateById,
    private readonly removeAmountsById: storageInterfaces.routers.amounts.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]> => { }

  getOne = ( amountsId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super> => { };

  add = ( amounts: storageInterfaces.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super> => { }

  update = ( amountsId: string, updates: storageInterfaces.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]> => { }

  remove = ( amountsId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAmounts: storageInterfaces.routers.amounts.Get,
  getAmountsById: storageInterfaces.routers.amounts.GetById,
  addNewAmounts: storageInterfaces.routers.amounts.Add,
  updateAmountsById: storageInterfaces.routers.amounts.UpdateById,
  removeAmountsById: storageInterfaces.routers.amounts.RemoveById
} ): adminInterfaces.Amounts => {
  return new Amounts(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getAmounts,
    params.getAmountsById,
    params.addNewAmounts,
    params.updateAmountsById,
    params.removeAmountsById
  );
}

/******************************************************************************/