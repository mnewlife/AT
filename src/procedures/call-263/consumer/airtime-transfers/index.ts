/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as consumer from "../../../../src/procedures/call-263/consumer";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class AirtimeTransfers implements consumer.AirtimeTransfers {

  constructor(
    private readonly events: consumer.airtimeTransfers.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtimeTransfers: storage.call263.airtimeTransfer.Get,
    private readonly getAirtimeTransferById: storage.call263.airtimeTransfer.GetById
  ) { }

  get = ( filtrationCriteria: storage.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storage.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super[]> => { }

  getOne = ( airtimeTransferId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,
  readonly getAirtimeTransfers: storage.call263.airtimeTransfer.Get,
  readonly getAirtimeTransferById: storage.call263.airtimeTransfer.GetById
} ): consumer.AirtimeTransfers => {
  return new AirtimeTransfers(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimeTransfers,
    params.getAirtimeTransferById
  );
}

/******************************************************************************/