/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventListener from "../../../../src/event-listener";
import * as admin from "../../../../src/procedures/call-263/admin";
import * as storage from "../../../../src/components/storage";
import * as sharedLogic from "../../../../src/components/shared-logic";

import events from "./events";

/******************************************************************************/

class Channels implements admin.Channels {

  constructor(
    private readonly events: admin.channels.Events,
    private readonly checkThrow: sharedLogic.moders.CheckThrow,

    private readonly getChannels: storage.call263.channel.Get,
    private readonly getChannelById: storage.call263.channel.GetById,
    private readonly addNewChannels: storage.call263.channel.AddBatch,
    private readonly addNewChannel: storage.call263.channel.Add,
    private readonly updateChannelById: storage.call263.channel.UpdateById,
    private readonly removeChannelById: storage.call263.channel.RemoveById
  ) { }

  get = ( filtrationCriteria: storage.call263.channel.FiltrationCriteria, sortCriteria: storage.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getChannels( filtrationCriteria, sortCriteria, limit );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  getOne = ( channelId: string, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super> => {


    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.getChannelById( channelId );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "MakeTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  };

  add = ( channels: storage.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.addNewChannels( channels );

      } )
      .catch(( reason: any ) => {

        return Promise.reject( {
          identifier: "MakeTransferFailed",
          data: {
            reason: reason
          }
        } );

      } );

  };

  addOne = ( channel: storage.call263.channel.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super> => {

  }

  update = ( channelId: string, updates: storage.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => { }

  remove = ( channelId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventListener.Emit,
  checkThrow: sharedLogic.moders.CheckThrow,

  getChannels: storage.call263.channel.Get,
  getChannelById: storage.call263.channel.GetById,
  addNewChannels: storage.call263.channel.AddBatch,
  addNewChannel: storage.call263.channel.Add,
  updateChannelById: storage.call263.channel.UpdateById,
  removeChannelById: storage.call263.channel.RemoveById
} ): admin.Channels => {
  return new Channels(
    eventsFactory( params.emitEvent ),
    params.checkThrow,

    params.getChannels,
    params.getChannelById,
    params.addNewChannels,
    params.addNewChannel,
    params.updateChannelById,
    params.removeChannelById
  );
}

/******************************************************************************/