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

class Sales implements adminInterfaces.Sales {

  constructor(
    private readonly events: adminInterfaces.sales.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getSales: storageInterfaces.routers.sale.Get,
    private readonly getSaleById: storageInterfaces.routers.sale.GetById,
    private readonly addNewSale: storageInterfaces.routers.sale.Add,
    private readonly updateSaleById: storageInterfaces.routers.sale.UpdateById,
    private readonly removeSaleById: storageInterfaces.routers.sale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageInterfaces.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]> => { }

  getOne = ( saleId: string, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super> => { };

  add = ( sale: storageInterfaces.routers.sale.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super> => { }

  update = ( saleId: string, updates: storageInterfaces.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]> => { }

  remove = ( saleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getSales: storageInterfaces.routers.sale.Get,
  getSaleById: storageInterfaces.routers.sale.GetById,
  addNewSale: storageInterfaces.routers.sale.Add,
  updateSaleById: storageInterfaces.routers.sale.UpdateById,
  removeSaleById: storageInterfaces.routers.sale.RemoveById
} ): adminInterfaces.Sales => {
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