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

class Airtime implements adminInterfaces.Airtime {

  constructor(
    private readonly events: adminInterfaces.airtime.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtime: storageInterfaces.powertel.airtime.Get,
    private readonly getAirtimeById: storageInterfaces.powertel.airtime.GetById,
    private readonly addNewAirtime: storageInterfaces.powertel.airtime.Add,
    private readonly updateAirtimeById: storageInterfaces.powertel.airtime.UpdateById,
    private readonly removeAirtimeById: storageInterfaces.powertel.airtime.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { }

  getOne = ( airtimeId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super> => { };

  add = ( airtime: storageInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { };

  update = ( airtimeId: string, updates: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]> => { }

  remove = ( airtimeId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtime: storageInterfaces.powertel.airtime.Get,
  getAirtimeById: storageInterfaces.powertel.airtime.GetById,
  addNewAirtime: storageInterfaces.powertel.airtime.Add,
  updateAirtimeById: storageInterfaces.powertel.airtime.UpdateById,
  removeAirtimeById: storageInterfaces.powertel.airtime.RemoveById
} ): adminInterfaces.Airtime => {
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