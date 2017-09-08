/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/routers/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Amounts implements admin.Amounts {

  constructor(
    private readonly events: admin.amounts.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAmounts: storage.routers.amounts.Get,
    private readonly getAmountsById: storage.routers.amounts.GetById,
    private readonly addNewAmounts: storage.routers.amounts.Add,
    private readonly updateAmountsById: storage.routers.amounts.UpdateById,
    private readonly removeAmountsById: storage.routers.amounts.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.routers.amounts.FiltrationCriteria, sortCriteria: storage.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super[]> => { }

  getOne = ( amountsId: string, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super> => { };

  add = ( amounts: storage.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super> => { }

  update = ( amountsId: string, updates: storage.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super[]> => { }

  remove = ( amountsId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getAmounts: storage.routers.amounts.Get,
  getAmountsById: storage.routers.amounts.GetById,
  addNewAmounts: storage.routers.amounts.Add,
  updateAmountsById: storage.routers.amounts.UpdateById,
  removeAmountsById: storage.routers.amounts.RemoveById
} ): admin.Amounts => {
  return new Amounts(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getAmounts,
    params.getAmountsById,
    params.addNewAmounts,
    params.updateAmountsById,
    params.removeAmountsById
  );
}

/******************************************************************************/