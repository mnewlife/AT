/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../interfaces/tasks/groc-round";

import pricesFactory from "./prices";
import productsFactory from "./products";
import shopsFactory from "./shops";
import usersFactory from "./users";

/******************************************************************************/

class Admin implements grocRoundInterfaces.Admin {
  constructor(
    readonly prices: grocRoundInterfaces.admin.Prices,
    readonly products: grocRoundInterfaces.admin.Products,
    readonly shops: grocRoundInterfaces.admin.Shops,
    readonly users: grocRoundInterfaces.admin.Users,
  ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): grocRoundInterfaces.Admin => {
  return new Admin( pricesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getPrices: config.components.storage.grocRound.price.get,
    getPriceById: config.components.storage.grocRound.price.getById,
    addNewPrice: config.components.storage.grocRound.price.add,
    updatePriceById: config.components.storage.grocRound.price.updateById,
    removePriceById: config.components.storage.grocRound.price.removeById,
  } ),
  productsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getProducts: config.components.storage.grocRound.product.get,
    getProductById: config.components.storage.grocRound.product.getById,
    addNewProduct: config.components.storage.grocRound.product.add,
    updateProductById: config.components.storage.grocRound.product.updateById,
    removeProductById: config.components.storage.grocRound.product.removeById,
  } ),
  shopsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getShops: config.components.storage.grocRound.shop.get,
    getShopById: config.components.storage.grocRound.shop.getById,
    addNewShop: config.components.storage.grocRound.shop.add,
    updateShopById: config.components.storage.grocRound.shop.updateById,
    removeShopById: config.components.storage.grocRound.shop.removeById,
  } ),
  usersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getUsers: config.components.storage.core.user.get,
    getUserById: config.components.storage.core.user.getById,
    removeUserById: config.components.storage.core.user.removeById
  } )
 );
}

/******************************************************************************/