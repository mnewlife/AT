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
  ( filtrationCriteria: storageInterfaces.powertel.card.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.card.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super[]>;
}

export interface GetOne {
  ( cardId: string, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super>;
}

export interface Add {
  ( card: storageInterfaces.powertel.card.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super>;
}

export interface Update {
  ( cardId: string, updates: storageInterfaces.powertel.card.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.card.Super>;
}

export interface Remove {
  ( cardId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/