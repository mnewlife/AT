/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as powertelInterfaces from "../../../interfaces/tasks/powertel";

import airtimeFactory from "./airtime";
import airtimeSalesFactory from "./airtime-sales";
import cardSalesFactory from "./card-sales";
import cardsFactory from "./cards";
import newAirtimeStockFactory from "./new-airtime-stock";
import newCardStockFactory from "./new-card-stock";

/******************************************************************************/

class Admin implements powertelInterfaces.Admin {
  constructor(
    readonly airtime: powertelInterfaces.admin.Airtime,
    readonly airtimeSales: powertelInterfaces.admin.AirtimeSales,
    readonly cardSales: powertelInterfaces.admin.CardSales,
    readonly cards: powertelInterfaces.admin.Cards,
    readonly newAirtimeStock: powertelInterfaces.admin.NewAirtimeStock,
    readonly newCardStock: powertelInterfaces.admin.NewCardStock,
  ) { }
}

/******************************************************************************/

export default ( config: interfaces.Config ): powertelInterfaces.Admin => {
  return new Admin( airtimeFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtime: config.components.storage.powertel.airtime.get,
    getAirtimeById: config.components.storage.powertel.airtime.getById,
    addNewAirtime: config.components.storage.powertel.airtime.add,
    updateAirtimeById: config.components.storage.powertel.airtime.updateById,
    removeAirtimeById: config.components.storage.powertel.airtime.removeById,
  } ),
  airtimeSalesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimeSale: config.components.storage.powertel.airtimeSale.get,
    getAirtimeSaleById: config.components.storage.powertel.airtimeSale.getById,
    addNewAirtimeSale: config.components.storage.powertel.airtimeSale.add,
    updateAirtimeSaleById: config.components.storage.powertel.airtimeSale.updateById,
    removeAirtimeSaleById: config.components.storage.powertel.airtimeSale.removeById,
  } ),
  cardSalesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getCardSale: config.components.storage.powertel.cardSale.get,
    getCardSaleById: config.components.storage.powertel.cardSale.getById,
    addNewCardSale: config.components.storage.powertel.cardSale.add,
    updateCardSaleById: config.components.storage.powertel.cardSale.updateById,
    removeCardSaleById: config.components.storage.powertel.cardSale.removeById,
  } ),
  cardsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getCards: config.components.storage.powertel.card.get,
    getCardById: config.components.storage.powertel.card.getById,
    addNewCard: config.components.storage.powertel.card.add,
    updateCardById: config.components.storage.powertel.card.updateById,
    removeCardById: config.components.storage.powertel.card.removeById,
  } ),
  newAirtimeStockFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getNewAirtimeStock: config.components.storage.powertel.newAirtimeStock.get,
    getNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.getById,
    addNewNewAirtimeStock: config.components.storage.powertel.newAirtimeStock.add,
    updateNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.updateById,
    removeNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.removeById,
  } ),
  newCardStockFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getNewCardStock: config.components.storage.powertel.newCardStock.get,
    getNewCardStockById: config.components.storage.powertel.newCardStock.getById,
    addNewNewCardStock: config.components.storage.powertel.newCardStock.add,
    updateNewCardStockById: config.components.storage.powertel.newCardStock.updateById,
    removeNewCardStockById: config.components.storage.powertel.newCardStock.removeById,
  } ),
 );
}

/******************************************************************************/