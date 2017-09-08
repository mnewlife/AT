/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/routers/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class NewRouterStock implements admin.NewRouterStock {

  constructor(
    private readonly events: admin.newRouterStock.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getNewRouterStock: storage.routers.newRouterStock.Get,
    private readonly getNewRouterStockById: storage.routers.newRouterStock.GetById,
    private readonly addNewNewRouterStock: storage.routers.newRouterStock.Add,
    private readonly updateNewRouterStockById: storage.routers.newRouterStock.UpdateById,
    private readonly removeNewRouterStockById: storage.routers.newRouterStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.routers.newRouterStock.FiltrationCriteria, sortCriteria: storage.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]> => { }

  getOne = ( newRouterStockId: string, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super> => { };

  add = ( newRouterStock: storage.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super> => { }

  update = ( newRouterStockId: string, updates: storage.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]> => { }

  remove = ( newRouterStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getNewRouterStock: storage.routers.newRouterStock.Get,
  getNewRouterStockById: storage.routers.newRouterStock.GetById,
  addNewNewRouterStock: storage.routers.newRouterStock.Add,
  updateNewRouterStockById: storage.routers.newRouterStock.UpdateById,
  removeNewRouterStockById: storage.routers.newRouterStock.RemoveById
} ): admin.NewRouterStock => {
  return new NewRouterStock(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewRouterStock,
    params.getNewRouterStockById,
    params.addNewNewRouterStock,
    params.updateNewRouterStockById,
    params.removeNewRouterStockById
  );
}

/******************************************************************************/