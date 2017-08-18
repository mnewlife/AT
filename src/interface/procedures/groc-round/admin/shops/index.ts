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
  ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super[]>;
}

export interface GetOne {
  ( shopId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super>;
}

export interface Add {
  ( shop: storageInterfaces.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super>;
}

export interface Update {
  ( shopId: string, updates: storageInterfaces.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.shop.Super>;
}

export interface Remove {
  ( shopId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/