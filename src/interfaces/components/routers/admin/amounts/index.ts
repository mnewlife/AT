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
  ( filtrationCriteria: storageManagerInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface GetOne {
  ( amountsId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

export interface Add {
  ( amounts: storageManagerInterfaces.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

export interface Update {
  ( amountsId: string, updates: storageManagerInterfaces.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface Remove {
  ( amountsId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/