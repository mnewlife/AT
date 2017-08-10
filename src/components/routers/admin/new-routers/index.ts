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

class NewRouterStock implements adminInterfaces.NewRouterStock {

  constructor(
    private readonly emitter: adminInterfaces.newRouterStock.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewRouterStock: storageManagerInterfaces.routers.newRouterStock.Get,
    private readonly getNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.GetById,
    private readonly addNewNewRouterStock: storageManagerInterfaces.routers.newRouterStock.Add,
    private readonly updateNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.UpdateById,
    private readonly removeNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]> => { }

  getOne = ( newRouterStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super> => { };

  add = ( newRouterStock: storageManagerInterfaces.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super> => { }

  update = ( newRouterStockId: string, updates: storageManagerInterfaces.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]> => { }

  remove = ( newRouterStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewRouterStock: storageManagerInterfaces.routers.newRouterStock.Get,
  getNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.GetById,
  addNewNewRouterStock: storageManagerInterfaces.routers.newRouterStock.Add,
  updateNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.UpdateById,
  removeNewRouterStockById: storageManagerInterfaces.routers.newRouterStock.RemoveById
} ): adminInterfaces.NewRouterStock => {
  return new NewRouterStock(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getNewRouterStock,
    params.getNewRouterStockById,
    params.addNewNewRouterStock,
    params.updateNewRouterStockById,
    params.removeNewRouterStockById
  );
}

/******************************************************************************/