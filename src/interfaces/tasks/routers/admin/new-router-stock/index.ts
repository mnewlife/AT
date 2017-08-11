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
  ( filtrationCriteria: storageInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]>;
}

export interface GetOne {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super>;
}

export interface Add {
  ( newRouterStock: storageInterfaces.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super>;
}

export interface Update {
  ( newRouterStockId: string, updates: storageInterfaces.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]>;
}

export interface Remove {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/