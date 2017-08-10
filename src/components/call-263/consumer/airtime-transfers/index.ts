/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/components/call-263/consumer";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class AirtimeTransfers implements consumerInterfaces.AirtimeTransfers {

  constructor(
    private readonly emitter: consumerInterfaces.airtimeTransfers.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeTransfers: storageManagerInterfaces.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.GetById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]> => { }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  readonly getAirtimeTransfers: storageManagerInterfaces.call263.airtimeTransfer.Get,
  readonly getAirtimeTransferById: storageManagerInterfaces.call263.airtimeTransfer.GetById
} ): consumerInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimeTransfers,
    params.getAirtimeTransferById
  );
}

/******************************************************************************/