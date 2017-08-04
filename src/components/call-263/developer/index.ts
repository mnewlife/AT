/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as call263Interfaces from "../../../interfaces/components/call-263/index";

import airtimeTransfersFactory from "./airtime-transfers/index";
import channelsFactory from "./channels/index";
import paymentsFactory from "./payments/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Developer implements call263Interfaces.Developer {

  readonly airtimeTransfers: call263Interfaces.developer.AirtimeTransfers;
  readonly channels: call263Interfaces.developer.Channels;
  readonly payments: call263Interfaces.developer.Payments;

  constructor( params: call263Interfaces.developer.Params ) {
    this.airtimeTransfers = params.airtimeTransfers;
    this.channels = params.channels;
    this.payments = params.payments;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: call263Interfaces.SharedCode ): call263Interfaces.Developer => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Developer( {
    airtimeTransfers: airtimeTransfersFactory( config.eventManager.emit, localSharedCode ),
    channels: channelsFactory( config.eventManager.emit, localSharedCode ),
    payments: paymentsFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

