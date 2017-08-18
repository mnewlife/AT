/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/powertel/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class NewAirtimeStock implements adminInterfaces.NewAirtimeStock {

  constructor(
    private readonly events: adminInterfaces.newAirtimeStock.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Get,
    private readonly getNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.GetById,
    private readonly addNewNewAirtimeStock: storageInterfaces.powertel.newAirtimeStock.Add,
    private readonly updateNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.UpdateById,
    private readonly removeNewAirtimeStockById: storageInterfaces.powertel.newAirtimeStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { }

  getOne = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super> => { };

  add = ( newAirtimeStock: storageInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { };

  update = ( newAirtimeStockId: string, updates: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { }

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
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewAirtimeStock,
    params.getNewAirtimeStockById,
    params.addNewNewAirtimeStock,
    params.updateNewAirtimeStockById,
    params.removeNewAirtimeStockById
  );
}

/******************************************************************************/