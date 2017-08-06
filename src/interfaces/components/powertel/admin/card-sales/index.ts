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
  ( filtrationCriteria: storageManagerInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

export interface GetOne {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

export interface Add {
  ( cardSale: storageManagerInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

export interface Update {
  ( cardSaleId: string, updates: storageManagerInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

export interface Remove {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/