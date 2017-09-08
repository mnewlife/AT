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

class AirtimePayments implements consumer.AirtimePayments {

  constructor(
    private readonly events: consumer.airtimePayments.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getAirtimePayments: storage.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storage.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storage.call263.airtimePayment.Add

  ) { }

  get = ( filtrationCriteria: storage.call263.airtimePayment.FiltrationCriteria, sortCriteria: storage.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]> => { }

  getOne = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => { };

  makePayment = ( userId: string, channelId: string, amount: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

  }

  recordPayment = ( airtimePayment: storage.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,
  readonly getAirtimePayments: storage.call263.airtimePayment.Get,
  readonly getAirtimePaymentById: storage.call263.airtimePayment.GetById,
  readonly addNewAirtimePayment: storage.call263.airtimePayment.Add
} ): consumer.AirtimePayments => {
  return new AirtimePayments(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimePayments,
    params.getAirtimePaymentById,
    params.addNewAirtimePayment
  );
}

/******************************************************************************/