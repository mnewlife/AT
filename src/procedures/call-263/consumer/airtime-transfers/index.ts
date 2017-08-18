/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as consumerInterfaces from "../../../../src/procedures/call-263/consumer";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class AirtimeTransfers implements consumerInterfaces.AirtimeTransfers {

  constructor(
    private readonly events: consumerInterfaces.airtimeTransfers.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super[]> => { }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  readonly getAirtimeTransfers: storageInterfaces.call263.airtimeTransfer.Get,
  readonly getAirtimeTransferById: storageInterfaces.call263.airtimeTransfer.GetById
} ): consumerInterfaces.AirtimeTransfers => {
  return new AirtimeTransfers(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimeTransfers,
    params.getAirtimeTransferById
  );
}

/******************************************************************************/