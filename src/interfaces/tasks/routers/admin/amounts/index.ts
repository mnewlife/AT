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
  ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface GetOne {
  ( amountsId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

export interface Add {
  ( amounts: storageInterfaces.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

export interface Update {
  ( amountsId: string, updates: storageInterfaces.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface Remove {
  ( amountsId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/