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

class NewCardStock implements admin.NewCardStock {

  constructor(
    private readonly events: admin.newCardStock.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getNewCardStock: storage.powertel.newCardStock.Get,
    private readonly getNewCardStockById: storage.powertel.newCardStock.GetById,
    private readonly addNewNewCardStock: storage.powertel.newCardStock.Add,
    private readonly updateNewCardStockById: storage.powertel.newCardStock.UpdateById,
    private readonly removeNewCardStockById: storage.powertel.newCardStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.newCardStock.FiltrationCriteria, sortCriteria: storage.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super[]> => { }

  getOne = ( newCardStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super> => { };

  add = ( newCardStock: storage.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super[]> => { };

  update = ( newCardStockId: string, updates: storage.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super[]> => { }

  remove = ( newCardStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getNewCardStock: storage.powertel.newCardStock.Get,
  getNewCardStockById: storage.powertel.newCardStock.GetById,
  addNewNewCardStock: storage.powertel.newCardStock.Add,
  updateNewCardStockById: storage.powertel.newCardStock.UpdateById,
  removeNewCardStockById: storage.powertel.newCardStock.RemoveById
} ): admin.NewCardStock => {
  return new NewCardStock(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewCardStock,
    params.getNewCardStockById,
    params.addNewNewCardStock,
    params.updateNewCardStockById,
    params.removeNewCardStockById
  );
}

/******************************************************************************/