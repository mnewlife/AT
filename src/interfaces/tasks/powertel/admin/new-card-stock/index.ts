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
  ( filtrationCriteria: storageInterfaces.powertel.newCardStock.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.newCardStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]>;
}

export interface GetOne {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Add {
  ( newCardStock: storageInterfaces.powertel.newCardStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Update {
  ( newCardStockId: string, updates: storageInterfaces.powertel.newCardStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

export interface Remove {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/