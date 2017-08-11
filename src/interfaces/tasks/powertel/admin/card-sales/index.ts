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
  ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

export interface GetOne {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

export interface Add {
  ( cardSale: storageInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

export interface Update {
  ( cardSaleId: string, updates: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

export interface Remove {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/