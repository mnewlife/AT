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
  ( filtrationCriteria: storageInterfaces.routers.amounts.FiltrationCriteria, sortCriteria: storageInterfaces.routers.amounts.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super[]>;
}

export interface GetOne {
  ( amountsId: string, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super>;
}

export interface Add {
  ( amounts: storageInterfaces.routers.amounts.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super>;
}

export interface Update {
  ( amountsId: string, updates: storageInterfaces.routers.amounts.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.amounts.Super[]>;
}

export interface Remove {
  ( amountsId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/