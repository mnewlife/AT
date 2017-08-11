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
  ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageInterfaces.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface GetOne {
  ( saleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

export interface Add {
  ( sale: storageInterfaces.routers.sale.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

export interface Update {
  ( saleId: string, updates: storageInterfaces.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface Remove {
  ( saleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/