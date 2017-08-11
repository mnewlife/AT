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
  ( filtrationCriteria: storageInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]>;
}

export interface GetOne {
  ( newStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Add {
  ( newAirtimeStock: storageInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Update {
  ( newStockId: string, updates: storageInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Remove {
  ( newStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/