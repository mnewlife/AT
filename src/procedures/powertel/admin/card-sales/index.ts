/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/powertel/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class CardSales implements adminInterfaces.CardSales {

  constructor(
    private readonly events: adminInterfaces.cardSales.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCardSale: storageInterfaces.powertel.cardSale.Get,
    private readonly getCardSaleById: storageInterfaces.powertel.cardSale.GetById,
    private readonly addNewCardSale: storageInterfaces.powertel.cardSale.Add,
    private readonly updateCardSaleById: storageInterfaces.powertel.cardSale.UpdateById,
    private readonly removeCardSaleById: storageInterfaces.powertel.cardSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { }

  getOne = ( cardSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super> => { };

  add = ( cardSale: storageInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { };

  update = ( cardSaleId: string, updates: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { }

  remove = ( cardSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getCardSale: storageInterfaces.powertel.cardSale.Get,
  getCardSaleById: storageInterfaces.powertel.cardSale.GetById,
  addNewCardSale: storageInterfaces.powertel.cardSale.Add,
  updateCardSaleById: storageInterfaces.powertel.cardSale.UpdateById,
  removeCardSaleById: storageInterfaces.powertel.cardSale.RemoveById
} ): adminInterfaces.CardSales => {
  return new CardSales(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getCardSale,
    params.getCardSaleById,
    params.addNewCardSale,
    params.updateCardSaleById,
    params.removeCardSaleById
  );
}

/******************************************************************************/