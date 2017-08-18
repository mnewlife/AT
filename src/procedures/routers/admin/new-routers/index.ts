/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/routers/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class NewRouterStock implements adminInterfaces.NewRouterStock {

  constructor(
    private readonly events: adminInterfaces.newRouterStock.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewRouterStock: storageInterfaces.routers.newRouterStock.Get,
    private readonly getNewRouterStockById: storageInterfaces.routers.newRouterStock.GetById,
    private readonly addNewNewRouterStock: storageInterfaces.routers.newRouterStock.Add,
    private readonly updateNewRouterStockById: storageInterfaces.routers.newRouterStock.UpdateById,
    private readonly removeNewRouterStockById: storageInterfaces.routers.newRouterStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]> => { }

  getOne = ( newRouterStockId: string, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super> => { };

  add = ( newRouterStock: storageInterfaces.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super> => { }

  update = ( newRouterStockId: string, updates: storageInterfaces.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]> => { }

  remove = ( newRouterStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewRouterStock: storageInterfaces.routers.newRouterStock.Get,
  getNewRouterStockById: storageInterfaces.routers.newRouterStock.GetById,
  addNewNewRouterStock: storageInterfaces.routers.newRouterStock.Add,
  updateNewRouterStockById: storageInterfaces.routers.newRouterStock.UpdateById,
  removeNewRouterStockById: storageInterfaces.routers.newRouterStock.RemoveById
} ): adminInterfaces.NewRouterStock => {
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