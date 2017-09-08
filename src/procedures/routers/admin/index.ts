/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as routers from "../../../src/procedures/routers";

import amounts from "./amounts";
import newRouters from "./new-routers";
import sales from "./sales";

/******************************************************************************/

class Admin implements routers.Admin {
  constructor(
    readonly amounts: routers.admin.Amounts,
    readonly newRouterStock: routers.admin.NewRouterStock,
    readonly sales: routers.admin.Sales
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): routers.Admin => {
  return new Admin( amountsFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAmounts: config.components.storage.routers.amounts.get,
    getAmountsById: config.components.storage.routers.amounts.getById,
    addNewAmounts: config.components.storage.routers.amounts.add,
    updateAmountsById: config.components.storage.routers.amounts.updateById,
    removeAmountsById: config.components.storage.routers.amounts.removeById,
  } ),
  newRoutersFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getNewRouterStock: config.components.storage.routers.newRouterStock.get,
    getNewRouterStockById: config.components.storage.routers.newRouterStock.getById,
    addNewNewRouterStock: config.components.storage.routers.newRouterStock.add,
    updateNewRouterStockById: config.components.storage.routers.newRouterStock.updateById,
    removeNewRouterStockById: config.components.storage.routers.newRouterStock.removeById,
  } ),
  salesFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getSales: config.components.storage.routers.sale.get,
    getSaleById: config.components.storage.routers.sale.getById,
    addNewSale: config.components.storage.routers.sale.add,
    updateSaleById: config.components.storage.routers.sale.updateById,
    removeSaleById: config.components.storage.routers.sale.removeById,
  } ) );
}

/******************************************************************************/