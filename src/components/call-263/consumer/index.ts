/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as call263Interfaces from "../../../interfaces/components/call-263/index";

import airtimeTransfersFactory from "./airtime-transfers/index";
import channelFactory from "./channel/index";
import paymentsFactory from "./payments/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Consumer implements call263Interfaces.Consumer {

  readonly airtimeTransfers: call263Interfaces.consumer.AirtimeTransfers;
  readonly channel: call263Interfaces.consumer.Channel;
  readonly payments: call263Interfaces.consumer.Payments;

  constructor( params: call263Interfaces.consumer.Params ) {
    this.airtimeTransfers = params.airtimeTransfers;
    this.channel = params.channel;
    this.payments = params.payments;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: call263Interfaces.SharedCode ): call263Interfaces.Consumer => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Consumer( {
    airtimeTransfers: airtimeTransfersFactory( config.eventManager.emit, localSharedCode ),
    channel: channelFactory( config.eventManager.emit, localSharedCode ),
    payments: paymentsFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

