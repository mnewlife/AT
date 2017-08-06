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
  ( filtrationCriteria: storageManagerInterfaces.routers.newRouterStock.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.newRouterStock.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]>;
}

export interface GetOne {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super>;
}

export interface Add {
  ( newRouterStock: storageManagerInterfaces.routers.newRouterStock.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super>;
}

export interface Update {
  ( newRouterStockId: string, updates: storageManagerInterfaces.routers.newRouterStock.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.newRouterStock.Super[]>;
}

export interface Remove {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/