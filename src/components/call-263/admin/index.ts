/******************************************************************************/

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as call263Interfaces from "../../../interfaces/components/call-263";

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

export default ( config: interfaces.Config ): call263Interfaces.Admin => {
  return new Admin( airtimePaymentsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtimePayments: config.utilities.storageManager.call263.airtimePayment.get,
    getAirtimePaymentById: config.utilities.storageManager.call263.airtimePayment.getById,
    addNewAirtimePayments: config.utilities.storageManager.call263.airtimePayment.addBatch,
    addNewAirtimePayment: config.utilities.storageManager.call263.airtimePayment.add,
    updateAirtimePaymentById: config.utilities.storageManager.call263.airtimePayment.updateById,
    removeAirtimePaymentById: config.utilities.storageManager.call263.airtimePayment.removeById,
  } ),
  airtimeTransfersFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getAirtimeTransfers: config.utilities.storageManager.call263.airtimeTransfer.get,
    getAirtimeTransferById: config.utilities.storageManager.call263.airtimeTransfer.getById,
    addNewAirtimeTransfer: config.utilities.storageManager.call263.airtimeTransfer.add,
    updateAirtimeTransferById: config.utilities.storageManager.call263.airtimeTransfer.updateById,
    removeAirtimeTransferById: config.utilities.storageManager.call263.airtimeTransfer.removeById,
  } ),
  channelsFactory( {
    emitEvent: config.eventManager.emit,
    checkThrow: config.utilities.sharedLogic.moders.checkThrow,
    getChannels: config.utilities.storageManager.call263.channel.get,
    getChannelById: config.utilities.storageManager.call263.channel.getById,
    addNewChannels: config.utilities.storageManager.call263.channel.addBatch,
    addNewChannel: config.utilities.storageManager.call263.channel.add,
    updateChannelById: config.utilities.storageManager.call263.channel.updateById,
    removeChannelById: config.utilities.storageManager.call263.channel.removeById,
  } ) );
}

/******************************************************************************/