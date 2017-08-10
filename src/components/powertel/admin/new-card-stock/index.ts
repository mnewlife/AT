/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/powertel/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class NewCardStock implements adminInterfaces.NewCardStock {

  constructor(
    private readonly emitter: adminInterfaces.newCardStock.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewCardStock: storageManagerInterfaces.powertel.newCardStock.Get,
    private readonly getNewCardStockById: storageManagerInterfaces.powertel.newCardStock.GetById,
    private readonly addNewNewCardStock: storageManagerInterfaces.powertel.newCardStock.Add,
    private readonly updateNewCardStockById: storageManagerInterfaces.powertel.newCardStock.UpdateById,
    private readonly removeNewCardStockById: storageManagerInterfaces.powertel.newCardStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { }

  getOne = ( newCardStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super> => { };

  add = ( newCardStock: storageManagerInterfaces.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { };

  update = ( newCardStockId: string, updates: storageManagerInterfaces.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]> => { }

  remove = ( newCardStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewCardStock: storageManagerInterfaces.powertel.newCardStock.Get,
  getNewCardStockById: storageManagerInterfaces.powertel.newCardStock.GetById,
  addNewNewCardStock: storageManagerInterfaces.powertel.newCardStock.Add,
  updateNewCardStockById: storageManagerInterfaces.powertel.newCardStock.UpdateById,
  removeNewCardStockById: storageManagerInterfaces.powertel.newCardStock.RemoveById
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