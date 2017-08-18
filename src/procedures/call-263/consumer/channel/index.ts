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

class Channel implements consumerInterfaces.Channel {

  constructor(
    private readonly events: consumerInterfaces.channel.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getChannelById: storageInterfaces.call263.channel.GetById
  ) { }

  getDetails = ( channelId: string, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => { }

  getBalances = ( channelId: string, forceThrow?: boolean ): Promise<any> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getChannelById: storageInterfaces.call263.channel.GetById
} ): consumerInterfaces.Channel => {
  return new Channel(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getChannelById
  );
}

/******************************************************************************/