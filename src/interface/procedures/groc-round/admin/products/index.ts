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
  ( filtrationCriteria: storageInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super[]>;
}

export interface GetOne {
  ( productId: string, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super>;
}

export interface Add {
  ( product: storageInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super>;
}

export interface Update {
  ( productId: string, updates: storageInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.grocRound.product.Super>;
}

export interface Remove {
  ( productId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/