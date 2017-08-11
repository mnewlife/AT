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
  ( filtrationCriteria: storageInterfaces.core.user.FiltrationCriteria, sortCriteria: storageInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]>;
}

export interface GetOne {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface Remove {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/