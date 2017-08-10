/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces";
import * as authenticationManagerInterfaces from "../../../../../interfaces/utilities/authentication-manager";
import * as storageManagerInterfaces from "../../../../../interfaces/utilities/storage-manager";
import * as sharedLogicInterfaces from "../../../../../interfaces/utilities/shared-logic";

/******************************************************************************/

export interface Emitter {

}

export interface Get {
  ( filtrationCriteria: storageManagerInterfaces.powertel.newAirtimeStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.newAirtimeStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super[]>;
}

export interface GetOne {
  ( newStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Add {
  ( newAirtimeStock: storageManagerInterfaces.powertel.newAirtimeStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Update {
  ( newStockId: string, updates: storageManagerInterfaces.powertel.newAirtimeStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newAirtimeStock.Super>;
}

export interface Remove {
  ( newStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/