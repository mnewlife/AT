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

class AirtimeSales implements adminInterfaces.AirtimeSales {

  constructor(
    private readonly emitter: adminInterfaces.airtimeSales.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeSale: storageManagerInterfaces.powertel.airtimeSale.Get,
    private readonly getAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.GetById,
    private readonly addNewAirtimeSale: storageManagerInterfaces.powertel.airtimeSale.Add,
    private readonly updateAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.UpdateById,
    private readonly removeAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { }

  getOne = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super> => { };

  add = ( airtimeSale: storageManagerInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { };

  update = ( airtimeSaleId: string, updates: storageManagerInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]> => { }

  remove = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtimeSale: storageManagerInterfaces.powertel.airtimeSale.Get,
  getAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.GetById,
  addNewAirtimeSale: storageManagerInterfaces.powertel.airtimeSale.Add,
  updateAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.UpdateById,
  removeAirtimeSaleById: storageManagerInterfaces.powertel.airtimeSale.RemoveById
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