/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as grocRound from "../../../src/procedures/groc-round";

import prices from "./prices";
import products from "./products";
import shops from "./shops";
import users from "./users";

/******************************************************************************/

class Admin implements grocRound.Admin {
  constructor(
    readonly prices: grocRound.admin.Prices,
    readonly products: grocRound.admin.Products,
    readonly shops: grocRound.admin.Shops,
    readonly users: grocRound.admin.Users,
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): grocRound.Admin => {
  return new Admin( pricesFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getPrices: config.components.storage.grocRound.price.get,
    getPriceById: config.components.storage.grocRound.price.getById,
    addNewPrice: config.components.storage.grocRound.price.add,
    updatePriceById: config.components.storage.grocRound.price.updateById,
    removePriceById: config.components.storage.grocRound.price.removeById,
  } ),
  productsFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getProducts: config.components.storage.grocRound.product.get,
    getProductById: config.components.storage.grocRound.product.getById,
    addNewProduct: config.components.storage.grocRound.product.add,
    updateProductById: config.components.storage.grocRound.product.updateById,
    removeProductById: config.components.storage.grocRound.product.removeById,
  } ),
  shopsFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getShops: config.components.storage.grocRound.shop.get,
    getShopById: config.components.storage.grocRound.shop.getById,
    addNewShop: config.components.storage.grocRound.shop.add,
    updateShopById: config.components.storage.grocRound.shop.updateById,
    removeShopById: config.components.storage.grocRound.shop.removeById,
  } ),
  usersFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getUsers: config.components.storage.core.user.get,
    getUserById: config.components.storage.core.user.getById,
    removeUserById: config.components.storage.core.user.removeById
  } )
 );
}

/******************************************************************************/