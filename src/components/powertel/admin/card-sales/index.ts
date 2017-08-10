/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/powertel/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class CardSales implements adminInterfaces.CardSales {

  constructor(
    private readonly emitter: adminInterfaces.cardSales.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCardSale: storageManagerInterfaces.powertel.cardSale.Get,
    private readonly getCardSaleById: storageManagerInterfaces.powertel.cardSale.GetById,
    private readonly addNewCardSale: storageManagerInterfaces.powertel.cardSale.Add,
    private readonly updateCardSaleById: storageManagerInterfaces.powertel.cardSale.UpdateById,
    private readonly removeCardSaleById: storageManagerInterfaces.powertel.cardSale.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { }

  getOne = ( cardSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super> => { };

  add = ( cardSale: storageManagerInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { };

  update = ( cardSaleId: string, updates: storageManagerInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]> => { }

  remove = ( cardSaleId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getCardSale: storageManagerInterfaces.powertel.cardSale.Get,
  getCardSaleById: storageManagerInterfaces.powertel.cardSale.GetById,
  addNewCardSale: storageManagerInterfaces.powertel.cardSale.Add,
  updateCardSaleById: storageManagerInterfaces.powertel.cardSale.UpdateById,
  removeCardSaleById: storageManagerInterfaces.powertel.cardSale.RemoveById
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