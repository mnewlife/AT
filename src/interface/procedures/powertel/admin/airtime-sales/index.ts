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
  ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]>;
}

export interface GetOne {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

export interface Add {
  ( airtimeSale: storageInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

export interface Update {
  ( airtimeSaleId: string, updates: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

export interface Remove {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/