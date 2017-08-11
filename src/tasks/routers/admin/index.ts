/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as routersInterfaces from "../../../interfaces/tasks/routers";

import amountsFactory from "./amounts";
import newRoutersFactory from "./new-routers";
import salesFactory from "./sales";

/******************************************************************************/

class Admin implements routersInterfaces.Admin {
  constructor(
    readonly amounts: routersInterfaces.admin.Amounts,
    readonly newRouterStock: routersInterfaces.admin.NewRouterStock,
    readonly sales: routersInterfaces.admin.Sales
  ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): routersInterfaces.Admin => {
  return new Admin( amountsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAmounts: config.components.storage.routers.amounts.get,
    getAmountsById: config.components.storage.routers.amounts.getById,
    addNewAmounts: config.components.storage.routers.amounts.add,
    updateAmountsById: config.components.storage.routers.amounts.updateById,
    removeAmountsById: config.components.storage.routers.amounts.removeById,
  } ),
  newRoutersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getNewRouterStock: config.components.storage.routers.newRouterStock.get,
    getNewRouterStockById: config.components.storage.routers.newRouterStock.getById,
    addNewNewRouterStock: config.components.storage.routers.newRouterStock.add,
    updateNewRouterStockById: config.components.storage.routers.newRouterStock.updateById,
    removeNewRouterStockById: config.components.storage.routers.newRouterStock.removeById,
  } ),
  salesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getSales: config.components.storage.routers.sale.get,
    getSaleById: config.components.storage.routers.sale.getById,
    addNewSale: config.components.storage.routers.sale.add,
    updateSaleById: config.components.storage.routers.sale.updateById,
    removeSaleById: config.components.storage.routers.sale.removeById,
  } ) );
}

/******************************************************************************/