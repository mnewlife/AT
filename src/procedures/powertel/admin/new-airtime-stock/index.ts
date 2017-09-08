/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/powertel/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class NewAirtimeStock implements admin.NewAirtimeStock {

  constructor(
    private readonly events: admin.newAirtimeStock.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getNewAirtimeStock: storage.powertel.newAirtimeStock.Get,
    private readonly getNewAirtimeStockById: storage.powertel.newAirtimeStock.GetById,
    private readonly addNewNewAirtimeStock: storage.powertel.newAirtimeStock.Add,
    private readonly updateNewAirtimeStockById: storage.powertel.newAirtimeStock.UpdateById,
    private readonly removeNewAirtimeStockById: storage.powertel.newAirtimeStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storage.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { }

  getOne = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super> => { };

  add = ( newAirtimeStock: storage.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { };

  update = ( newAirtimeStockId: string, updates: storage.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]> => { }

  remove = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getNewAirtimeStock: storage.powertel.newAirtimeStock.Get,
  getNewAirtimeStockById: storage.powertel.newAirtimeStock.GetById,
  addNewNewAirtimeStock: storage.powertel.newAirtimeStock.Add,
  updateNewAirtimeStockById: storage.powertel.newAirtimeStock.UpdateById,
  removeNewAirtimeStockById: storage.powertel.newAirtimeStock.RemoveById
} ): admin.NewAirtimeStock => {
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