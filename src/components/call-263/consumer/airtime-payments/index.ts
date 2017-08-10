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

class AirtimePayments implements consumerInterfaces.AirtimePayments {

  constructor(
    private readonly emitter: consumerInterfaces.airtimePayments.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getAirtimePayments: storageManagerInterfaces.call263.airtimePayment.Get,
    private readonly getAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.GetById,
    private readonly addNewAirtimePayment: storageManagerInterfaces.call263.airtimePayment.Add

  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]> => { }

  getOne = ( airtimePaymentId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => { };

  makePayment = ( userId: string, channelId: string, amount: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

  }

  recordPayment = ( airtimePayment: storageManagerInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super> => {

  }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,
  readonly getAirtimePayments: storageManagerInterfaces.call263.airtimePayment.Get,
  readonly getAirtimePaymentById: storageManagerInterfaces.call263.airtimePayment.GetById,
  readonly addNewAirtimePayment: storageManagerInterfaces.call263.airtimePayment.Add
} ): consumerInterfaces.AirtimePayments => {
  return new AirtimePayments(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getAirtimePayments,
    params.getAirtimePaymentById,
    params.addNewAirtimePayment
  );
}

/******************************************************************************/