/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as consumer from "../../../../src/procedures/call-263/consumer";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Channel implements consumer.Channel {

  constructor(
    private readonly events: consumer.channel.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getChannelById: storage.call263.channel.GetById
  ) { }

  getDetails = ( channelId: string, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => { }

  getBalances = ( channelId: string, forceThrow?: boolean ): Promise<any> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getChannelById: storage.call263.channel.GetById
} ): consumer.Channel => {
  return new Channel(
    eventsFactory( params.emitEvent ),
    params.checkThrow,
    params.getChannelById
  );
}

/******************************************************************************/