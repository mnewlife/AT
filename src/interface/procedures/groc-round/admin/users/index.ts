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
  ( filtrationCriteria: storageInterfaces.core.user.FiltrationCriteria, sortCriteria: storageInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.core.user.Super[]>;
}

export interface GetOne {
  ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

export interface Remove {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/