/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";
import * as adminInterfaces from "../../../../interfaces/components/call-263/admin";
import * as storageManagerInterfaces from "../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class Channels implements adminInterfaces.Channels {

  constructor(
    private readonly emitter: adminInterfaces.channels.Emitter,
    private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow,

    private readonly getChannels: storageManagerInterfaces.call263.channel.Get,
    private readonly getChannelById: storageManagerInterfaces.call263.channel.GetById,
    private readonly addNewChannels: storageManagerInterfaces.call263.channel.AddBatch,
    private readonly addNewChannel: storageManagerInterfaces.call263.channel.Add,
    private readonly updateChannelById: storageManagerInterfaces.call263.channel.UpdateById,
    private readonly removeChannelById: storageManagerInterfaces.call263.channel.RemoveById
  ) { }

  get = ( filtrationCriteria: storageManagerInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

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

  getOne = ( channelId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super> => {


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

  add = ( channels: storageManagerInterfaces.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]> => {

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

  addOne = ( channel: storageManagerInterfaces.call263.channel.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super> => {

  }

  update = ( channelId: string, updates: storageManagerInterfaces.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]> => { }

  remove = ( channelId: string, forceThrow?: boolean ): Promise<void> => { }

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: sharedLogicInterfaces.moders.CheckThrow,

  getChannels: storageManagerInterfaces.call263.channel.Get,
  getChannelById: storageManagerInterfaces.call263.channel.GetById,
  addNewChannels: storageManagerInterfaces.call263.channel.AddBatch,
  addNewChannel: storageManagerInterfaces.call263.channel.Add,
  updateChannelById: storageManagerInterfaces.call263.channel.UpdateById,
  removeChannelById: storageManagerInterfaces.call263.channel.RemoveById
} ): adminInterfaces.Channels => {
  return new Channels(
    emitterFactory( params.emitEvent ),
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