/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as powertel from "../../../src/procedures/powertel";

import airtime from "./airtime";
import airtimeSales from "./airtime-sales";
import cardSales from "./card-sales";
import cards from "./cards";
import newAirtimeStock from "./new-airtime-stock";
import newCardStock from "./new-card-stock";

/******************************************************************************/

class Admin implements powertel.Admin {
  constructor(
    readonly airtime: powertel.admin.Airtime,
    readonly airtimeSales: powertel.admin.AirtimeSales,
    readonly cardSales: powertel.admin.CardSales,
    readonly cards: powertel.admin.Cards,
    readonly newAirtimeStock: powertel.admin.NewAirtimeStock,
    readonly newCardStock: powertel.admin.NewCardStock,
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): powertel.Admin => {
  return new Admin( airtimeFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtime: config.components.storage.powertel.airtime.get,
    getAirtimeById: config.components.storage.powertel.airtime.getById,
    addNewAirtime: config.components.storage.powertel.airtime.add,
    updateAirtimeById: config.components.storage.powertel.airtime.updateById,
    removeAirtimeById: config.components.storage.powertel.airtime.removeById,
  } ),
  airtimeSalesFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimeSale: config.components.storage.powertel.airtimeSale.get,
    getAirtimeSaleById: config.components.storage.powertel.airtimeSale.getById,
    addNewAirtimeSale: config.components.storage.powertel.airtimeSale.add,
    updateAirtimeSaleById: config.components.storage.powertel.airtimeSale.updateById,
    removeAirtimeSaleById: config.components.storage.powertel.airtimeSale.removeById,
  } ),
  cardSalesFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getCardSale: config.components.storage.powertel.cardSale.get,
    getCardSaleById: config.components.storage.powertel.cardSale.getById,
    addNewCardSale: config.components.storage.powertel.cardSale.add,
    updateCardSaleById: config.components.storage.powertel.cardSale.updateById,
    removeCardSaleById: config.components.storage.powertel.cardSale.removeById,
  } ),
  cardsFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getCards: config.components.storage.powertel.card.get,
    getCardById: config.components.storage.powertel.card.getById,
    addNewCard: config.components.storage.powertel.card.add,
    updateCardById: config.components.storage.powertel.card.updateById,
    removeCardById: config.components.storage.powertel.card.removeById,
  } ),
  newAirtimeStockFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getNewAirtimeStock: config.components.storage.powertel.newAirtimeStock.get,
    getNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.getById,
    addNewNewAirtimeStock: config.components.storage.powertel.newAirtimeStock.add,
    updateNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.updateById,
    removeNewAirtimeStockById: config.components.storage.powertel.newAirtimeStock.removeById,
  } ),
  newCardStockFactory( {
    emitEvent: config.eventListener.emit,
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