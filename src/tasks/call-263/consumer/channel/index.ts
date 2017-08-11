/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as consumerInterfaces from "../../../../interfaces/tasks/call-263/consumer";
import * as storageInterfaces from "../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Channel implements consumerInterfaces.Channel {

  constructor(
    private readonly emitter: consumerInterfaces.channel.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getChannelById: storageInterfaces.call263.channel.GetById
  ) { }

  getDetails = ( channelId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]> => { }

  getBalances = ( channelId: string, forceThrow?: boolean ): Promise<any> => { };

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getChannelById: storageInterfaces.call263.channel.GetById
} ): consumerInterfaces.Channel => {
  return new Channel(
    emitterFactory( params.emitEvent ),
    params.checkThrow,
    params.getChannelById
  );
}

/******************************************************************************/