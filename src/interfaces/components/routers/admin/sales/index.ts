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
  ( filtrationCriteria: storageManagerInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageManagerInterfaces.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface GetOne {
  ( saleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

export interface Add {
  ( sale: storageManagerInterfaces.routers.sale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

export interface Update {
  ( saleId: string, updates: storageManagerInterfaces.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface Remove {
  ( saleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/