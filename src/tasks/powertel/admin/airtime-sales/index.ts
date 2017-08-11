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

class AirtimeSales implements adminInterfaces.AirtimeSales {

  constructor(
    private readonly emitter: adminInterfaces.airtimeSales.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeSale: storageInterfaces.powertel.airtimeSale.Get,
    private readonly getAirtimeSaleById: storageInterfaces.powertel.airtimeSale.GetById,
    private readonly addNewAirtimeSale: storageInterfaces.powertel.airtimeSale.Add,
    private readonly updateAirtimeSaleById: storageInterfaces.powertel.airtimeSale.UpdateById,
    private readonly removeAirtimeSaleById: storageInterfaces.powertel.airtimeSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { }

  getOne = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super> => { };

  add = ( airtimeSale: storageInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { };

  update = ( airtimeSaleId: string, updates: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { }

  remove = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtimeSale: storageInterfaces.powertel.airtimeSale.Get,
  getAirtimeSaleById: storageInterfaces.powertel.airtimeSale.GetById,
  addNewAirtimeSale: storageInterfaces.powertel.airtimeSale.Add,
  updateAirtimeSaleById: storageInterfaces.powertel.airtimeSale.UpdateById,
  removeAirtimeSaleById: storageInterfaces.powertel.airtimeSale.RemoveById
} ): adminInterfaces.AirtimeSales => {
  return new AirtimeSales(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimeSale,
    params.getAirtimeSaleById,
    params.addNewAirtimeSale,
    params.updateAirtimeSaleById,
    params.removeAirtimeSaleById
  );
}

/******************************************************************************/