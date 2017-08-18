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
  ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageInterfaces.routers.sale.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]>;
}

export interface GetOne {
  ( saleId: string, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super>;
}

export interface Add {
  ( sale: storageInterfaces.routers.sale.AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super>;
}

export interface Update {
  ( saleId: string, updates: storageInterfaces.routers.sale.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.sale.Super[]>;
}

export interface Remove {
  ( saleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/