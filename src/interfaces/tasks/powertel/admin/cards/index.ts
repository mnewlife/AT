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
  ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]>;
}

export interface GetOne {
  ( cardId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Add {
  ( card: storageInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Update {
  ( cardId: string, updates: storageInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

export interface Remove {
  ( cardId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/