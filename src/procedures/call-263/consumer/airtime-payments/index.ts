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

class AirtimePayments implements consumerInterfaces.AirtimePayments {

  constructor(
    private readonly events: consumerInterfaces.airtimePayments.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimePayments: storageInterfaces.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storageInterfaces.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storageInterfaces.call263.airtimePayment.Add

  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]> => { }

  getOne = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => { };

  makePayment = ( userId: string, channelId: string, amount: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

  }

  recordPayment = ( airtimePayment: storageInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super> => {

  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  readonly getAirtimePayments: storageInterfaces.call263.airtimePayment.Get,
  readonly getAirtimePaymentById: storageInterfaces.call263.airtimePayment.GetById,
  readonly addNewAirtimePayment: storageInterfaces.call263.airtimePayment.Add
} ): consumerInterfaces.AirtimePayments => {
  return new AirtimePayments(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimePayments,
    params.getAirtimePaymentById,
    params.addNewAirtimePayment
  );
}

/******************************************************************************/