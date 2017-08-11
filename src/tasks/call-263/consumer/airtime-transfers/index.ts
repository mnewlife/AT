/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/tasks/call-263/consumer";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class AirtimeTransfers implements consumerInterfaces.AirtimeTransfers {

  constructor(
    private readonly emitter: consumerInterfaces.airtimeTransfers.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => { }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  readonly getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
  readonly getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById
} ): consumerInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimeTransfers,
    params.getAirtimeTransferById
  );
}

/******************************************************************************/