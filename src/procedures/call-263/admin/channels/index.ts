/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as src from "../../../../src";
import * as eventManagerInterfaces from "../../../../src/setup-config/event-manager";
import * as adminInterfaces from "../../../../src/procedures/call-263/admin";
import * as storageInterfaces from "../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../src/components/shared-logic";

import eventsFactory from "./events";

/******************************************************************************/

class Channels implements adminInterfaces.Channels {

  constructor(
    private readonly events: adminInterfaces.channels.Events,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getChannels: storageInterfaces.call263.channel.Get,
    private readonly getChannelById: storageInterfaces.call263.channel.GetById,
    private readonly addNewChannels: storageInterfaces.call263.channel.AddBatch,
    private readonly addNewChannel: storageInterfaces.call263.channel.Add,
    private readonly updateChannelById: storageInterfaces.call263.channel.UpdateById,
    private readonly removeChannelById: storageInterfaces.call263.channel.RemoveById
  ) { }

  get = ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageInterfaces.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => {

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

  add = ( channels: storageInterfaces.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => {

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

  addOne = ( channel: storageInterfaces.call263.channel.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super> => {

  }

  update = ( channelId: string, updates: storageInterfaces.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]> => { }

  remove = ( channelId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getChannels: storageInterfaces.call263.channel.Get,
  getChannelById: storageInterfaces.call263.channel.GetById,
  addNewChannels: storageInterfaces.call263.channel.AddBatch,
  addNewChannel: storageInterfaces.call263.channel.Add,
  updateChannelById: storageInterfaces.call263.channel.UpdateById,
  removeChannelById: storageInterfaces.call263.channel.RemoveById
} ): adminInterfaces.Channels => {
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