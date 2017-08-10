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

class NewAirtimeStock implements adminInterfaces.NewAirtimeStock {

  constructor(
    private readonly emitter: adminInterfaces.newAirtimeStock.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getNewAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.Get,
    private readonly getNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.GetById,
    private readonly addNewNewAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.Add,
    private readonly updateNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.UpdateById,
    private readonly removeNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { }

  getOne = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super> => { };

  add = ( newAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { };

  update = ( newAirtimeStockId: string, updates: storageManagerInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]> => { }

  remove = ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getNewAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.Get,
  getNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.GetById,
  addNewNewAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.Add,
  updateNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.UpdateById,
  removeNewAirtimeStockById: storageManagerInterfaces.powertel.newAirtimeStock.RemoveById
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