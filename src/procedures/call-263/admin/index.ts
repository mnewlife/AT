/******************************************************************************/

import * as src from "../../../src";
import * as eventManagerInterfaces from "../../../src/setup-config/event-manager";
import * as call263Interfaces from "../../../src/procedures/call-263";

import airtimePaymentsFactory from "./airtime-payments";
import airtimeTransfersFactory from "./airtime-transfers";
import channelsFactory from "./channels";

/******************************************************************************/

class Admin implements call263Interfaces.Admin {
  constructor(
    readonly airtimePayments: call263Interfaces.admin.AirtimePayments,
    readonly airtimeTransfers: call263Interfaces.admin.AirtimeTransfers,
    readonly channels: call263Interfaces.admin.Channels
  ) { }
}

/******************************************************************************/

export default ( config: src.Config ): call263Interfaces.Admin => {
  return new Admin( airtimePaymentsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimePayments: config.components.storage.call263.airtimePayment.get,
    getAirtimePaymentById: config.components.storage.call263.airtimePayment.getById,
    addNewAirtimePayments: config.components.storage.call263.airtimePayment.addBatch,
    addNewAirtimePayment: config.components.storage.call263.airtimePayment.add,
    updateAirtimePaymentById: config.components.storage.call263.airtimePayment.updateById,
    removeAirtimePaymentById: config.components.storage.call263.airtimePayment.removeById,
  } ),
  airtimeTransfersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getAirtimeTransfers: config.components.storage.call263.airtimeTransfer.get,
    getAirtimeTransferById: config.components.storage.call263.airtimeTransfer.getById,
    addNewAirtimeTransfer: config.components.storage.call263.airtimeTransfer.add,
    updateAirtimeTransferById: config.components.storage.call263.airtimeTransfer.updateById,
    removeAirtimeTransferById: config.components.storage.call263.airtimeTransfer.removeById,
  } ),
  channelsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.components.sharedLogic.moders.checkThrow,
    getChannels: config.components.storage.call263.channel.get,
    getChannelById: config.components.storage.call263.channel.getById,
    addNewChannels: config.components.storage.call263.channel.addBatch,
    addNewChannel: config.components.storage.call263.channel.add,
    updateChannelById: config.components.storage.call263.channel.updateById,
    removeChannelById: config.components.storage.call263.channel.removeById,
  } ) );
}

/******************************************************************************/