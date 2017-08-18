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
  ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]>;
}

export interface GetOne {
  ( newStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

export interface Add {
  ( newAirtimeStock: storageInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

export interface Update {
  ( newStockId: string, updates: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

export interface Remove {
  ( newStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/