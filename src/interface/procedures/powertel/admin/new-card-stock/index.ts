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
  ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super[]>;
}

export interface GetOne {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super>;
}

export interface Add {
  ( newCardStock: storageInterfaces.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super>;
}

export interface Update {
  ( newCardStockId: string, updates: storageInterfaces.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newCardStock.Super>;
}

export interface Remove {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/