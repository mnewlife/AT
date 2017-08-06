/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as authenticationManagerInterfaces from "../../../../../interfaces/utilities/authentication-manager";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

/******************************************************************************/

export interface Emitter {

}

export interface Get {
  ( filtrationCriteria: storageManagerInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface GetOne {
  ( channelId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super>;
}

export interface Add {
  ( channels: storageManagerInterfaces.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface AddOne {
  ( channel: storageManagerInterfaces.call263.channel.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super>;
}

export interface Update {
  ( channelId: string, updates: storageManagerInterfaces.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface Remove {
  ( channelId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
