/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/powertel/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class NewAirtimeStock implements adminInterfaces.NewAirtimeStock {

  constructor(
    private readonly emitter: adminInterfaces.newAirtimeStock.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Get,
    private readonly getNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.GetById,
    private readonly addNewNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Add,
    private readonly updateNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.UpdateById,
    private readonly removeNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { }

  getOne = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super> => { };

  add = ( newAirtimeStock: storageInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { };

  update = ( newAirtimeStockId: string, updates: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { }

  remove = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Get,
  getNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.GetById,
  addNewNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Add,
  updateNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.UpdateById,
  removeNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.RemoveById
} ): adminInterfaces.NewAirtimeStock => {
  return new NewAirtimeStock(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewAirtimeStock,
    params.getNewAirtimeStockById,
    params.addNewNewAirtimeStock,
    params.updateNewAirtimeStockById,
    params.removeNewAirtimeStockById
  );
}

/******************************************************************************/