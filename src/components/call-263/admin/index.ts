/******************************************************************************/

import * as interfaces from "../../../interfaces/index";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager/index";
import * as call263Interfaces from "../../../interfaces/components/call-263/index";

import airtimeTransfersFactory from "./airtime-transfers/index";
import channelsFactory from "./channels/index";
import paymentsFactory from "./payments/index";

import sharedCodeFactory from "./shared-code/index";

/******************************************************************************/

class Admin implements call263Interfaces.Admin {

  readonly airtimeTransfers: call263Interfaces.admin.AirtimeTransfers;
  readonly channels: call263Interfaces.admin.Channels;
  readonly payments: call263Interfaces.admin.Payments;

  constructor( params: call263Interfaces.admin.Params ) {
    this.airtimeTransfers = params.airtimeTransfers;
    this.channels = params.channels;
    this.payments = params.payments;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config, sharedCode: call263Interfaces.SharedCode ): call263Interfaces.Admin => {
  let localSharedCode = sharedCodeFactory( config, sharedCode );
  return new Admin( {
    airtimeTransfers: airtimeTransfersFactory( config.eventManager.emit, localSharedCode ),
    channels: channelsFactory( config.eventManager.emit, localSharedCode ),
    payments: paymentsFactory( config.eventManager.emit, localSharedCode )
  } );
}

/******************************************************************************/

