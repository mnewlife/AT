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
  ( filtrationCriteria: storageInterfaces.grocRound.product.FiltrationCriteria, sortCriteria: storageInterfaces.grocRound.product.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super[]>;
}

export interface GetOne {
  ( productId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super>;
}

export interface Add {
  ( product: storageInterfaces.grocRound.product.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super>;
}

export interface Update {
  ( productId: string, updates: storageInterfaces.grocRound.product.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.product.Super>;
}

export interface Remove {
  ( productId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/