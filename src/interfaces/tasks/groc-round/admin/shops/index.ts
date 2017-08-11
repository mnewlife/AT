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
  ( filtrationCriteria: storageInterfaces.grocRound.shop.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.shop.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super[]>;
}

export interface GetOne {
  ( shopId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super>;
}

export interface Add {
  ( shop: storageInterfaces.grocRound.shop.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super>;
}

export interface Update {
  ( shopId: string, updates: storageInterfaces.grocRound.shop.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.shop.Super>;
}

export interface Remove {
  ( shopId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/