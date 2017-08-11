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
  ( filtrationCriteria: storageInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]>;
}

export interface GetOne {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super>;
}

export interface Add {
  ( airtimeSale: storageInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super>;
}

export interface Update {
  ( airtimeSaleId: string, updates: storageInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super>;
}

export interface Remove {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/