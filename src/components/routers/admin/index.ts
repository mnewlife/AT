/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as routersInterfaces from "../../../interfaces/components/routers";

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
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAmounts: config.utilities.storageManager.routers.amounts.get,
    getAmountsById: config.utilities.storageManager.routers.amounts.getById,
    addNewAmounts: config.utilities.storageManager.routers.amounts.add,
    updateAmountsById: config.utilities.storageManager.routers.amounts.updateById,
    removeAmountsById: config.utilities.storageManager.routers.amounts.removeById,
  } ),
  newRoutersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getNewRouterStock: config.utilities.storageManager.routers.newRouterStock.get,
    getNewRouterStockById: config.utilities.storageManager.routers.newRouterStock.getById,
    addNewNewRouterStock: config.utilities.storageManager.routers.newRouterStock.add,
    updateNewRouterStockById: config.utilities.storageManager.routers.newRouterStock.updateById,
    removeNewRouterStockById: config.utilities.storageManager.routers.newRouterStock.removeById,
  } ),
  salesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getSales: config.utilities.storageManager.routers.sale.get,
    getSaleById: config.utilities.storageManager.routers.sale.getById,
    addNewSale: config.utilities.storageManager.routers.sale.add,
    updateSaleById: config.utilities.storageManager.routers.sale.updateById,
    removeSaleById: config.utilities.storageManager.routers.sale.removeById,
  } ) );
}

/******************************************************************************/