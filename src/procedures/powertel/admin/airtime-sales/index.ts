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

class AirtimeSales implements adminInterfaces.AirtimeSales {

  constructor(
    private readonly events: adminInterfaces.airtimeSales.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeSale: storageInterfaces.powertel.airtimeSale.Get,
    private readonly getAirtimeSaleById: storageInterfaces.powertel.airtimeSale.GetById,
    private readonly addNewAirtimeSale: storageInterfaces.powertel.airtimeSale.Add,
    private readonly updateAirtimeSaleById: storageInterfaces.powertel.airtimeSale.UpdateById,
    private readonly removeAirtimeSaleById: storageInterfaces.powertel.airtimeSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { }

  getOne = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super> => { };

  add = ( airtimeSale: storageInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { };

  update = ( airtimeSaleId: string, updates: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { }

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
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtimeSale,
    params.getAirtimeSaleById,
    params.addNewAirtimeSale,
    params.updateAirtimeSaleById,
    params.removeAirtimeSaleById
  );
}

/******************************************************************************/