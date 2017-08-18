/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/groc-round/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Prices implements adminInterfaces.Prices {

  constructor(
    private readonly events: adminInterfaces.prices.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getPrices: storageInterfaces.grocRound.price.Get,
    private readonly getPriceById: storageInterfaces.grocRound.price.GetById,
    private readonly addNewPrice: storageInterfaces.grocRound.price.Add,
    private readonly updatePriceById: storageInterfaces.grocRound.price.UpdateById,
    private readonly removePriceById: storageInterfaces.grocRound.price.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super[]> => { }

  getOne = ( priceId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super> => { };

  add = ( price: storageInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super> => { }

  update = ( priceId: string, updates: storageInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super[]> => { }

  remove = ( priceId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getPrices: storageInterfaces.grocRound.price.Get,
  getPriceById: storageInterfaces.grocRound.price.GetById,
  addNewPrice: storageInterfaces.grocRound.price.Add,
  updatePriceById: storageInterfaces.grocRound.price.UpdateById,
  removePriceById: storageInterfaces.grocRound.price.RemoveById
} ): adminInterfaces.Prices => {
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