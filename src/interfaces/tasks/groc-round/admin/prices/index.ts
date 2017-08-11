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
  ( filtrationCriteria: storageInterfaces.grocRound.price.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.price.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

export interface GetOne {
  ( priceId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

export interface Add {
  ( price: storageInterfaces.grocRound.price.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

export interface Update {
  ( priceId: string, updates: storageInterfaces.grocRound.price.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

export interface Remove {
  ( priceId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/