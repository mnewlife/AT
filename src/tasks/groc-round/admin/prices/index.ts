/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/groc-round/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Prices implements adminInterfaces.Prices {

  constructor(
    private readonly emitter: adminInterfaces.prices.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getPrices: storageInterfaces.grocRound.price.Get,
    private readonly getPriceById: storageInterfaces.grocRound.price.GetById,
    private readonly addNewPrice: storageInterfaces.grocRound.price.Add,
    private readonly updatePriceById: storageInterfaces.grocRound.price.UpdateById,
    private readonly removePriceById: storageInterfaces.grocRound.price.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]> => { }

  getOne = ( priceId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super> => { };

  add = ( price: storageInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super> => { }

  update = ( priceId: string, updates: storageInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]> => { }

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
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getPrices,
    params.getPriceById,
    params.addNewPrice,
    params.updatePriceById,
    params.removePriceById
  );
}

/******************************************************************************/