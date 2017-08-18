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

class Cards implements adminInterfaces.Cards {

  constructor(
    private readonly events: adminInterfaces.cards.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getCards: storageInterfaces.powertel.card.Get,
    private readonly getCardById: storageInterfaces.powertel.card.GetById,
    private readonly addNewCard: storageInterfaces.powertel.card.Add,
    private readonly updateCardById: storageInterfaces.powertel.card.UpdateById,
    private readonly removeCardById: storageInterfaces.powertel.card.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { }

  getOne = ( cardId: string, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super> => { };

  add = ( card: storageInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { };

  update = ( cardId: string, updates: storageInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { }

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
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getCards,
    params.getCardById,
    params.addNewCard,
    params.updateCardById,
    params.removeCardById
  );
}

/******************************************************************************/