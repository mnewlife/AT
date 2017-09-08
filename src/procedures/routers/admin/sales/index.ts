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

class Sales implements admin.Sales {

  constructor(
    private readonly events: admin.sales.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getSales: storage.routers.sale.Get,
    private readonly getSaleById: storage.routers.sale.GetById,
    private readonly addNewSale: storage.routers.sale.Add,
    private readonly updateSaleById: storage.routers.sale.UpdateById,
    private readonly removeSaleById: storage.routers.sale.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.routers.sale.FiltrationCriteria, sortCriteria: storage.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]> => { }

  getOne = ( saleId: string, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super> => { };

  add = ( sale: storage.routers.sale.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super> => { }

  update = ( saleId: string, updates: storage.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]> => { }

  remove = ( saleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getSales: storage.routers.sale.Get,
  getSaleById: storage.routers.sale.GetById,
  addNewSale: storage.routers.sale.Add,
  updateSaleById: storage.routers.sale.UpdateById,
  removeSaleById: storage.routers.sale.RemoveById
} ): admin.Sales => {
  return new Sales(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getSales,
    params.getSaleById,
    params.addNewSale,
    params.updateSaleById,
    params.removeSaleById
  );
}

/******************************************************************************/