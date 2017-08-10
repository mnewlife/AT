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
  ( filtrationCriteria: storageManagerInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]>;
}

export interface GetOne {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Add {
  ( newCardStock: storageManagerInterfaces.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Update {
  ( newCardStockId: string, updates: storageManagerInterfaces.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Remove {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/