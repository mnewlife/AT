/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as call263Interfaces from "../../../src/procedures/call-263";

import airtimePaymentsFactory from "./airtime-payments";
import airtimeTransfersFactory from "./airtime-transfers";
import channelFactory from "./channel";

/******************************************************************************/

class Consumer implements call263Interfaces.Consumer {
  constructor(
    readonly airtimePayments: call263Interfaces.consumer.AirtimePayments,
    readonly airtimeTransfers: call263Interfaces.consumer.AirtimeTransfers,
    readonly channel: call263Interfaces.consumer.Channel
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): call263Interfaces.Consumer => {
  return new Consumer( airtimePaymentsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimePayments: config.components.storage.call263.airtimePayment.get,
    getAirtimePaymentById: config.components.storage.call263.airtimePayment.getById,
    addNewAirtimePayment: config.components.storage.call263.airtimePayment.add
  } ),
  airtimeTransfersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimeTransfers: config.components.storage.call263.airtimeTransfer.get,
    getAirtimeTransferById: config.components.storage.call263.airtimeTransfer.getById
  } ),
  channelFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getChannelById: config.components.storage.call263.channel.getById
  } ) );
}

/******************************************************************************/