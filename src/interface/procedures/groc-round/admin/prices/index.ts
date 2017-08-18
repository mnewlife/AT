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
  ( filtrationCriteria: storageInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super[]>;
}

export interface GetOne {
  ( priceId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super>;
}

export interface Add {
  ( price: storageInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super>;
}

export interface Update {
  ( priceId: string, updates: storageInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.price.Super>;
}

export interface Remove {
  ( priceId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/