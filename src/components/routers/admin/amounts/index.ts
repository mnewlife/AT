/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/routers/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Amounts implements adminInterfaces.Amounts {

  constructor(
    private readonly emitter: adminInterfaces.amounts.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAmounts: storageManagerInterfaces.routers.amounts.Get,
    private readonly getAmountsById: storageManagerInterfaces.routers.amounts.GetById,
    private readonly addNewAmounts: storageManagerInterfaces.routers.amounts.Add,
    private readonly updateAmountsById: storageManagerInterfaces.routers.amounts.UpdateById,
    private readonly removeAmountsById: storageManagerInterfaces.routers.amounts.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]> => { }

  getOne = ( amountsId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super> => { };

  add = ( amounts: storageManagerInterfaces.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super> => { }

  update = ( amountsId: string, updates: storageManagerInterfaces.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]> => { }

  remove = ( amountsId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAmounts: storageManagerInterfaces.routers.amounts.Get,
  getAmountsById: storageManagerInterfaces.routers.amounts.GetById,
  addNewAmounts: storageManagerInterfaces.routers.amounts.Add,
  updateAmountsById: storageManagerInterfaces.routers.amounts.UpdateById,
  removeAmountsById: storageManagerInterfaces.routers.amounts.RemoveById
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