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

class Airtime implements admin.Airtime {

  constructor(
    private readonly events: admin.airtime.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtime: storage.powertel.airtime.Get,
    private readonly getAirtimeById: storage.powertel.airtime.GetById,
    private readonly addNewAirtime: storage.powertel.airtime.Add,
    private readonly updateAirtimeById: storage.powertel.airtime.UpdateById,
    private readonly removeAirtimeById: storage.powertel.airtime.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.powertel.airtime.FiltrationCriteria, sortCriteria: storage.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { }

  getOne = ( airtimeId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super> => { };

  add = ( airtime: storage.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { };

  update = ( airtimeId: string, updates: storage.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { }

  remove = ( airtimeId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getAirtime: storage.powertel.airtime.Get,
  getAirtimeById: storage.powertel.airtime.GetById,
  addNewAirtime: storage.powertel.airtime.Add,
  updateAirtimeById: storage.powertel.airtime.UpdateById,
  removeAirtimeById: storage.powertel.airtime.RemoveById
} ): admin.Airtime => {
  return new Airtime(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtime,
    params.getAirtimeById,
    params.addNewAirtime,
    params.updateAirtimeById,
    params.removeAirtimeById
  );
}

/******************************************************************************/