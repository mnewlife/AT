/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/groc-round/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Prices implements adminInterfaces.Prices {

  constructor(
    private readonly emitter: adminInterfaces.prices.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getPrices: storageManagerInterfaces.grocRound.price.Get,
    private readonly getPriceById: storageManagerInterfaces.grocRound.price.GetById,
    private readonly addNewPrice: storageManagerInterfaces.grocRound.price.Add,
    private readonly updatePriceById: storageManagerInterfaces.grocRound.price.UpdateById,
    private readonly removePriceById: storageManagerInterfaces.grocRound.price.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]> => { }

  getOne = ( priceId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super> => { };

  add = ( price: storageManagerInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super> => { }

  update = ( priceId: string, updates: storageManagerInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]> => { }

  remove = ( priceId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getPrices: storageManagerInterfaces.grocRound.price.Get,
  getPriceById: storageManagerInterfaces.grocRound.price.GetById,
  addNewPrice: storageManagerInterfaces.grocRound.price.Add,
  updatePriceById: storageManagerInterfaces.grocRound.price.UpdateById,
  removePriceById: storageManagerInterfaces.grocRound.price.RemoveById
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