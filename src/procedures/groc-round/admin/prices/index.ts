/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/groc-round/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Prices implements admin.Prices {

  constructor(
    private readonly events: admin.prices.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getPrices: storage.grocRound.price.Get,
    private readonly getPriceById: storage.grocRound.price.GetById,
    private readonly addNewPrice: storage.grocRound.price.Add,
    private readonly updatePriceById: storage.grocRound.price.UpdateById,
    private readonly removePriceById: storage.grocRound.price.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.grocRound.price.FiltrationCriteria, sortCriteria: storage.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super[]> => { }

  getOne = ( priceId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super> => { };

  add = ( price: storage.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super> => { }

  update = ( priceId: string, updates: storage.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super[]> => { }

  remove = ( priceId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getPrices: storage.grocRound.price.Get,
  getPriceById: storage.grocRound.price.GetById,
  addNewPrice: storage.grocRound.price.Add,
  updatePriceById: storage.grocRound.price.UpdateById,
  removePriceById: storage.grocRound.price.RemoveById
} ): admin.Prices => {
  return new Prices(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getPrices,
    params.getPriceById,
    params.addNewPrice,
    params.updatePriceById,
    params.removePriceById
  );
}

/******************************************************************************/