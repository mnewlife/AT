/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as call263Interfaces from "../../../interfaces/components/call-263";

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

export default ( config: interfaces.Config ): call263Interfaces.Consumer => {
  return new Consumer( airtimePaymentsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtimePayments: config.utilities.storageManager.call263.airtimePayment.get,
    getAirtimePaymentById: config.utilities.storageManager.call263.airtimePayment.getById,
    addNewAirtimePayment: config.utilities.storageManager.call263.airtimePayment.add
  } ),
  airtimeTransfersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtimeTransfers: config.utilities.storageManager.call263.airtimeTransfer.get,
    getAirtimeTransferById: config.utilities.storageManager.call263.airtimeTransfer.getById
  } ),
  channelFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getChannelById: config.utilities.storageManager.call263.channel.getById
  } ) );
}

/******************************************************************************/