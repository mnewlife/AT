/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as grocRoundInterfaces from "../../../interfaces/components/groc-round";

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
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getPrices: config.utilities.storageManager.grocRound.price.get,
    getPriceById: config.utilities.storageManager.grocRound.price.getById,
    addNewPrice: config.utilities.storageManager.grocRound.price.add,
    updatePriceById: config.utilities.storageManager.grocRound.price.updateById,
    removePriceById: config.utilities.storageManager.grocRound.price.removeById,
  } ),
  productsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getProducts: config.utilities.storageManager.grocRound.product.get,
    getProductById: config.utilities.storageManager.grocRound.product.getById,
    addNewProduct: config.utilities.storageManager.grocRound.product.add,
    updateProductById: config.utilities.storageManager.grocRound.product.updateById,
    removeProductById: config.utilities.storageManager.grocRound.product.removeById,
  } ),
  shopsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getShops: config.utilities.storageManager.grocRound.shop.get,
    getShopById: config.utilities.storageManager.grocRound.shop.getById,
    addNewShop: config.utilities.storageManager.grocRound.shop.add,
    updateShopById: config.utilities.storageManager.grocRound.shop.updateById,
    removeShopById: config.utilities.storageManager.grocRound.shop.removeById,
  } ),
  usersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getUsers: config.utilities.storageManager.core.user.get,
    getUserById: config.utilities.storageManager.core.user.getById,
    removeUserById: config.utilities.storageManager.core.user.removeById
  } )
 );
}

/******************************************************************************/