/******************************************************************************/

import * as src from "../../../src";
import * as eventListener from "../../../src/event-listener";
import * as call263 from "../../../src/procedures/call-263";

import airtimePayments from "./airtime-payments";
import airtimeTransfers from "./airtime-transfers";
import channel from "./channel";

/******************************************************************************/

class Consumer implements call263.Consumer {
  constructor(
    readonly airtimePayments: call263.consumer.AirtimePayments,
    readonly airtimeTransfers: call263.consumer.AirtimeTransfers,
    readonly channel: call263.consumer.Channel
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): call263.Consumer => {
  return new Consumer( airtimePaymentsFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimePayments: config.components.storage.call263.airtimePayment.get,
    getAirtimePaymentById: config.components.storage.call263.airtimePayment.getById,
    addNewAirtimePayment: config.components.storage.call263.airtimePayment.add
  } ),
  airtimeTransfersFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimeTransfers: config.components.storage.call263.airtimeTransfer.get,
    getAirtimeTransferById: config.components.storage.call263.airtimeTransfer.getById
  } ),
  channelFactory( {
    emitEvent: config.eventListener.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getChannelById: config.components.storage.call263.channel.getById
  } ) );
}

/******************************************************************************/