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
  ( filtrationCriteria: storageManagerInterfaces.powertel.airtimeSale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.airtimeSale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]>;
}

export interface GetOne {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super>;
}

export interface Add {
  ( airtimeSale: storageManagerInterfaces.powertel.airtimeSale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super>;
}

export interface Update {
  ( airtimeSaleId: string, updates: storageManagerInterfaces.powertel.airtimeSale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtimeSale.Super[]>;
}

export interface Remove {
  ( airtimeSaleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/