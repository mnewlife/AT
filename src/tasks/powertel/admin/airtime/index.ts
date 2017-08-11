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

class Airtime implements adminInterfaces.Airtime {

  constructor(
    private readonly emitter: adminInterfaces.airtime.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtime: storageInterfaces.powertel.airtime.Get,
    private readonly getAirtimeById: storageInterfaces.powertel.airtime.GetById,
    private readonly addNewAirtime: storageInterfaces.powertel.airtime.Add,
    private readonly updateAirtimeById: storageInterfaces.powertel.airtime.UpdateById,
    private readonly removeAirtimeById: storageInterfaces.powertel.airtime.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { }

  getOne = ( airtimeId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super> => { };

  add = ( airtime: storageInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { };

  update = ( airtimeId: string, updates: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { }

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
    emitterFactory( params.emitEvent ),
    params.checkThrow,

    params.getAirtime,
    params.getAirtimeById,
    params.addNewAirtime,
    params.updateAirtimeById,
    params.removeAirtimeById
  );
}

/******************************************************************************/