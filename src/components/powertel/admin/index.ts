/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as powertelInterfaces from "../../../interfaces/components/powertel";

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
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtime: config.utilities.storageManager.powertel.airtime.get,
    getAirtimeById: config.utilities.storageManager.powertel.airtime.getById,
    addNewAirtime: config.utilities.storageManager.powertel.airtime.add,
    updateAirtimeById: config.utilities.storageManager.powertel.airtime.updateById,
    removeAirtimeById: config.utilities.storageManager.powertel.airtime.removeById,
  } ),
  airtimeSalesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtimeSale: config.utilities.storageManager.powertel.airtimeSale.get,
    getAirtimeSaleById: config.utilities.storageManager.powertel.airtimeSale.getById,
    addNewAirtimeSale: config.utilities.storageManager.powertel.airtimeSale.add,
    updateAirtimeSaleById: config.utilities.storageManager.powertel.airtimeSale.updateById,
    removeAirtimeSaleById: config.utilities.storageManager.powertel.airtimeSale.removeById,
  } ),
  cardSalesFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getCardSale: config.utilities.storageManager.powertel.cardSale.get,
    getCardSaleById: config.utilities.storageManager.powertel.cardSale.getById,
    addNewCardSale: config.utilities.storageManager.powertel.cardSale.add,
    updateCardSaleById: config.utilities.storageManager.powertel.cardSale.updateById,
    removeCardSaleById: config.utilities.storageManager.powertel.cardSale.removeById,
  } ),
  cardsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getCards: config.utilities.storageManager.powertel.card.get,
    getCardById: config.utilities.storageManager.powertel.card.getById,
    addNewCard: config.utilities.storageManager.powertel.card.add,
    updateCardById: config.utilities.storageManager.powertel.card.updateById,
    removeCardById: config.utilities.storageManager.powertel.card.removeById,
  } ),
  newAirtimeStockFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getNewAirtimeStock: config.utilities.storageManager.powertel.newAirtimeStock.get,
    getNewAirtimeStockById: config.utilities.storageManager.powertel.newAirtimeStock.getById,
    addNewNewAirtimeStock: config.utilities.storageManager.powertel.newAirtimeStock.add,
    updateNewAirtimeStockById: config.utilities.storageManager.powertel.newAirtimeStock.updateById,
    removeNewAirtimeStockById: config.utilities.storageManager.powertel.newAirtimeStock.removeById,
  } ),
  newCardStockFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getNewCardStock: config.utilities.storageManager.powertel.newCardStock.get,
    getNewCardStockById: config.utilities.storageManager.powertel.newCardStock.getById,
    addNewNewCardStock: config.utilities.storageManager.powertel.newCardStock.add,
    updateNewCardStockById: config.utilities.storageManager.powertel.newCardStock.updateById,
    removeNewCardStockById: config.utilities.storageManager.powertel.newCardStock.removeById,
  } ),
 );
}

/******************************************************************************/