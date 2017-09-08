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

class AirtimeSales implements admin.AirtimeSales {

  constructor(
    private readonly events: admin.airtimeSales.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtimeSale: storage.powertel.airtimeSale.Get,
    private readonly getAirtimeSaleById: storage.powertel.airtimeSale.GetById,
    private readonly addNewAirtimeSale: storage.powertel.airtimeSale.Add,
    private readonly updateAirtimeSaleById: storage.powertel.airtimeSale.UpdateById,
    private readonly removeAirtimeSaleById: storage.powertel.airtimeSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storage.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { }

  getOne = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super> => { };

  add = ( airtimeSale: storage.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { };

  update = ( airtimeSaleId: string, updates: storage.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]> => { }

  remove = ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getAirtimeSale: storage.powertel.airtimeSale.Get,
  getAirtimeSaleById: storage.powertel.airtimeSale.GetById,
  addNewAirtimeSale: storage.powertel.airtimeSale.Add,
  updateAirtimeSaleById: storage.powertel.airtimeSale.UpdateById,
  removeAirtimeSaleById: storage.powertel.airtimeSale.RemoveById
} ): admin.AirtimeSales => {
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