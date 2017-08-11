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

class NewCardStock implements adminInterfaces.NewCardStock {

  constructor(
    private readonly emitter: adminInterfaces.newCardStock.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewCardStock: storageInterfaces.powertel.newCardStock.Get,
    private readonly getNewCardStockById: storageInterfaces.powertel.newCardStock.GetById,
    private readonly addNewNewCardStock: storageInterfaces.powertel.newCardStock.Add,
    private readonly updateNewCardStockById: storageInterfaces.powertel.newCardStock.UpdateById,
    private readonly removeNewCardStockById: storageInterfaces.powertel.newCardStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { }

  getOne = ( newCardStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super> => { };

  add = ( newCardStock: storageInterfaces.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { };

  update = ( newCardStockId: string, updates: storageInterfaces.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { }

  remove = ( newCardStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewCardStock: storageInterfaces.powertel.newCardStock.Get,
  getNewCardStockById: storageInterfaces.powertel.newCardStock.GetById,
  addNewNewCardStock: storageInterfaces.powertel.newCardStock.Add,
  updateNewCardStockById: storageInterfaces.powertel.newCardStock.UpdateById,
  removeNewCardStockById: storageInterfaces.powertel.newCardStock.RemoveById
} ): adminInterfaces.NewCardStock => {
  return new NewCardStock(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewCardStock,
    params.getNewCardStockById,
    params.addNewNewCardStock,
    params.updateNewCardStockById,
    params.removeNewCardStockById
  );
}

/******************************************************************************/