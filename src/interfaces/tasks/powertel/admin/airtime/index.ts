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
  ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

export interface GetOne {
  ( airtimeId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

export interface Add {
  ( airtime: storageInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

export interface Update {
  ( airtimeId: string, updates: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

export interface Remove {
  ( airtimeId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/