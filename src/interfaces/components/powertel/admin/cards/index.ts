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
  ( filtrationCriteria: storageManagerInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]>;
}

export interface GetOne {
  ( cardId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Add {
  ( card: storageManagerInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Update {
  ( cardId: string, updates: storageManagerInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Remove {
  ( cardId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/