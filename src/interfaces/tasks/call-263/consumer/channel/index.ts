/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as authenticationInterfaces from "../../../../../interfaces/components/authentication";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

/******************************************************************************/

export interface Emitter {

}

export interface GetDetails {
  ( channelId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.channel.Super[]>;
}

export interface GetBalances {
  ( channelId: string, forceThrow?: boolean ): Promise<any>;
}

/******************************************************************************/
