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
  ( filtrationCriteria: storageManagerInterfaces.core.user.FiltrationCriteria, sortCriteria: storageManagerInterfaces.core.user.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]>;
}

export interface GetOne {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

export interface Remove {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/