/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/tasks/powertel/admin";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class CardSales implements adminInterfaces.CardSales {

  constructor(
    private readonly emitter: adminInterfaces.cardSales.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCardSale: storageInterfaces.powertel.cardSale.Get,
    private readonly getCardSaleById: storageInterfaces.powertel.cardSale.GetById,
    private readonly addNewCardSale: storageInterfaces.powertel.cardSale.Add,
    private readonly updateCardSaleById: storageInterfaces.powertel.cardSale.UpdateById,
    private readonly removeCardSaleById: storageInterfaces.powertel.cardSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { }

  getOne = ( cardSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super> => { };

  add = ( cardSale: storageInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { };

  update = ( cardSaleId: string, updates: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { }

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
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getCardSale,
    params.getCardSaleById,
    params.addNewCardSale,
    params.updateCardSaleById,
    params.removeCardSaleById
  );
}

/******************************************************************************/