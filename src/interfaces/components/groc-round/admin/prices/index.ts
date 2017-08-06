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
  ( filtrationCriteria: storageManagerInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageManagerInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

export interface GetOne {
  ( priceId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

export interface Add {
  ( price: storageManagerInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

export interface Update {
  ( priceId: string, updates: storageManagerInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

export interface Remove {
  ( priceId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/