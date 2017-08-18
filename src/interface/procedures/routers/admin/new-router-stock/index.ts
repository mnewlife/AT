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
  ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]>;
}

export interface GetOne {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super>;
}

export interface Add {
  ( newRouterStock: storageInterfaces.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super>;
}

export interface Update {
  ( newRouterStockId: string, updates: storageInterfaces.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]>;
}

export interface Remove {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/