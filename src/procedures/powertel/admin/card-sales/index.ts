/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/powertel/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class CardSales implements admin.CardSales {

  constructor(
    private readonly events: admin.cardSales.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getCardSale: storage.powertel.cardSale.Get,
    private readonly getCardSaleById: storage.powertel.cardSale.GetById,
    private readonly addNewCardSale: storage.powertel.cardSale.Add,
    private readonly updateCardSaleById: storage.powertel.cardSale.UpdateById,
    private readonly removeCardSaleById: storage.powertel.cardSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.cardSale.FiltrationCriteria, sortCriteria: storage.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { }

  getOne = ( cardSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super> => { };

  add = ( cardSale: storage.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { };

  update = ( cardSaleId: string, updates: storage.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]> => { }

  remove = ( cardSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getCardSale: storage.powertel.cardSale.Get,
  getCardSaleById: storage.powertel.cardSale.GetById,
  addNewCardSale: storage.powertel.cardSale.Add,
  updateCardSaleById: storage.powertel.cardSale.UpdateById,
  removeCardSaleById: storage.powertel.cardSale.RemoveById
} ): admin.CardSales => {
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