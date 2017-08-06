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
  ( filtrationCriteria: storageManagerInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super[]>;
}

export interface GetOne {
  ( shopId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super>;
}

export interface Add {
  ( shop: storageManagerInterfaces.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super>;
}

export interface Update {
  ( shopId: string, updates: storageManagerInterfaces.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super[]>;
}

export interface Remove {
  ( shopId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/