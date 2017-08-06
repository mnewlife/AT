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
  ( filtrationCriteria: storageManagerInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]>;
}

export interface GetOne {
  ( productId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super>;
}

export interface Add {
  ( product: storageManagerInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super>;
}

export interface Update {
  ( productId: string, updates: storageManagerInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]>;
}

export interface Remove {
  ( productId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/