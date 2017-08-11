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

class Cards implements adminInterfaces.Cards {

  constructor(
    private readonly emitter: adminInterfaces.cards.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCards: storageInterfaces.powertel.card.Get,
    private readonly getCardById: storageInterfaces.powertel.card.GetById,
    private readonly addNewCard: storageInterfaces.powertel.card.Add,
    private readonly updateCardById: storageInterfaces.powertel.card.UpdateById,
    private readonly removeCardById: storageInterfaces.powertel.card.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { }

  getOne = ( cardId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super> => { };

  add = ( card: storageInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { };

  update = ( cardId: string, updates: storageInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]> => { }

  remove = ( cardId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getCards: storageInterfaces.powertel.card.Get,
  getCardById: storageInterfaces.powertel.card.GetById,
  addNewCard: storageInterfaces.powertel.card.Add,
  updateCardById: storageInterfaces.powertel.card.UpdateById,
  removeCardById: storageInterfaces.powertel.card.RemoveById
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