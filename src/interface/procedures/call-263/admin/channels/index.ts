/******************************************************************************/

import * as express from "express";

import * as src from "../../../../../src";
import * as authenticationInterfaces from "../../../../../src/components/authentication";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

/******************************************************************************/

export interface Events {

}

export interface Get {
  ( filtrationCriteria: storageInterfaces.call263.channel.FiltrationCriteria, sortCriteria: storageInterfaces.call263.channel.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]>;
}

export interface GetOne {
  ( channelId: string, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super>;
}

export interface Add {
  ( channels: storageInterfaces.call263.channel.AddDetails[], forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]>;
}

export interface AddOne {
  ( channel: storageInterfaces.call263.channel.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super>;
}

export interface Update {
  ( channelId: string, updates: storageInterfaces.call263.channel.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super>;
}

export interface Remove {
  ( channelId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
