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
  ( filtrationCriteria: storageInterfaces.powertel.cardSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.cardSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super[]>;
}

export interface GetOne {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super>;
}

export interface Add {
  ( cardSale: storageInterfaces.powertel.cardSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super>;
}

export interface Update {
  ( cardSaleId: string, updates: storageInterfaces.powertel.cardSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.cardSale.Super>;
}

export interface Remove {
  ( cardSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/