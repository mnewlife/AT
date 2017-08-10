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

class Airtime implements adminInterfaces.Airtime {

  constructor(
    private readonly emitter: adminInterfaces.airtime.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtime: storageManagerInterfaces.powertel.airtime.Get,
    private readonly getAirtimeById: storageManagerInterfaces.powertel.airtime.GetById,
    private readonly addNewAirtime: storageManagerInterfaces.powertel.airtime.Add,
    private readonly updateAirtimeById: storageManagerInterfaces.powertel.airtime.UpdateById,
    private readonly removeAirtimeById: storageManagerInterfaces.powertel.airtime.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { }

  getOne = ( airtimeId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super> => { };

  add = ( airtime: storageManagerInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { };

  update = ( airtimeId: string, updates: storageManagerInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]> => { }

  remove = ( airtimeId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getAirtime: storageManagerInterfaces.powertel.airtime.Get,
  getAirtimeById: storageManagerInterfaces.powertel.airtime.GetById,
  addNewAirtime: storageManagerInterfaces.powertel.airtime.Add,
  updateAirtimeById: storageManagerInterfaces.powertel.airtime.UpdateById,
  removeAirtimeById: storageManagerInterfaces.powertel.airtime.RemoveById
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