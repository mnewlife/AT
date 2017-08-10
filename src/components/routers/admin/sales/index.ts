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

class Sales implements adminInterfaces.Sales {

  constructor(
    private readonly emitter: adminInterfaces.sales.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getSale: storageManagerInterfaces.routers.sale.Get,
    private readonly getSaleById: storageManagerInterfaces.routers.sale.GetById,
    private readonly addNewSale: storageManagerInterfaces.routers.sale.Add,
    private readonly updateSaleById: storageManagerInterfaces.routers.sale.UpdateById,
    private readonly removeSaleById: storageManagerInterfaces.routers.sale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]> => { }

  getOne = ( saleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super> => { };

  add = ( sale: storageManagerInterfaces.routers.sale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super> => { }

  update = ( saleId: string, updates: storageManagerInterfaces.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]> => { }

  remove = ( saleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getSale: storageManagerInterfaces.routers.sale.Get,
  getSaleById: storageManagerInterfaces.routers.sale.GetById,
  addNewSale: storageManagerInterfaces.routers.sale.Add,
  updateSaleById: storageManagerInterfaces.routers.sale.UpdateById,
  removeSaleById: storageManagerInterfaces.routers.sale.RemoveById
} ): adminInterfaces.Sales => {
  return new Sales(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getSale,
    params.getSaleById,
    params.addNewSale,
    params.updateSaleById,
    params.removeSaleById
  );
}

/******************************************************************************/