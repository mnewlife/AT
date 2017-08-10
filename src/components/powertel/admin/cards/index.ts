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

class Cards implements adminInterfaces.Cards {

  constructor(
    private readonly emitter: adminInterfaces.cards.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCards: storageManagerInterfaces.powertel.card.Get,
    private readonly getCardById: storageManagerInterfaces.powertel.card.GetById,
    private readonly addNewCard: storageManagerInterfaces.powertel.card.Add,
    private readonly updateCardById: storageManagerInterfaces.powertel.card.UpdateById,
    private readonly removeCardById: storageManagerInterfaces.powertel.card.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { }

  getOne = ( cardId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super> => { };

  add = ( card: storageManagerInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { };

  update = ( cardId: string, updates: storageManagerInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { }

  remove = ( cardId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getCards: storageManagerInterfaces.powertel.card.Get,
  getCardById: storageManagerInterfaces.powertel.card.GetById,
  addNewCard: storageManagerInterfaces.powertel.card.Add,
  updateCardById: storageManagerInterfaces.powertel.card.UpdateById,
  removeCardById: storageManagerInterfaces.powertel.card.RemoveById
} ): adminInterfaces.Cards => {
  return new Cards(
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getCards,
    params.getCardById,
    params.addNewCard,
    params.updateCardById,
    params.removeCardById
  );
}

/******************************************************************************/