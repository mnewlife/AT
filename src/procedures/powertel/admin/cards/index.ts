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

class Cards implements admin.Cards {

  constructor(
    private readonly events: admin.cards.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getCards: storage.powertel.card.Get,
    private readonly getCardById: storage.powertel.card.GetById,
    private readonly addNewCard: storage.powertel.card.Add,
    private readonly updateCardById: storage.powertel.card.UpdateById,
    private readonly removeCardById: storage.powertel.card.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.card.FiltrationCriteria, sortCriteria: storage.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { }

  getOne = ( cardId: string, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super> => { };

  add = ( card: storage.powertel.card.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { };

  update = ( cardId: string, updates: storage.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]> => { }

  remove = ( cardId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getCards: storage.powertel.card.Get,
  getCardById: storage.powertel.card.GetById,
  addNewCard: storage.powertel.card.Add,
  updateCardById: storage.powertel.card.UpdateById,
  removeCardById: storage.powertel.card.RemoveById
} ): admin.Cards => {
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