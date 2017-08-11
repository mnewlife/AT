/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as authenticationInterfaces from "../../../../../interfaces/components/authentication";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

/******************************************************************************/

export interface Emitter {

}

export interface Get {
  ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageInterfaces.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface GetOne {
  ( channelId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super>;
}

export interface Add {
  ( channels: storageInterfaces.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface AddOne {
  ( channel: storageInterfaces.call263.channel.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super>;
}

export interface Update {
  ( channelId: string, updates: storageInterfaces.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super>;
}

export interface Remove {
  ( channelId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
