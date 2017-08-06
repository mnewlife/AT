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
  ( filtrationCriteria: storageManagerInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageManagerInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

export interface GetOne {
  ( airtimeId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

export interface Add {
  ( airtime: storageManagerInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

export interface Update {
  ( airtimeId: string, updates: storageManagerInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

export interface Remove {
  ( airtimeId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/