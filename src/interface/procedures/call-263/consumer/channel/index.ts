/******************************************************************************/

import * as express from "express";

import * as src from "../../../../../src";
import * as authenticationInterfaces from "../../../../../src/components/authentication";
import * as storageInterfaces from "../../../../../src/components/storage";
import * as sharedLogicInterfaces from "../../../../../src/components/shared-logic";

/******************************************************************************/

export interface Events {

}

export interface GetDetails {
  ( channelId: string, forceThrow?: boolean ): Promise<dataModel.call263.channel.Super[]>;
}

export interface GetBalances {
  ( channelId: string, forceThrow?: boolean ): Promise<any>;
}

/******************************************************************************/
