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
  ( filtrationCriteria: storageInterfaces.powertel.airtime.FiltrationCriteria, sortCriteria: storageInterfaces.powertel.airtime.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super[]>;
}

export interface GetOne {
  ( airtimeId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super>;
}

export interface Add {
  ( airtime: storageInterfaces.powertel.airtime.AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super>;
}

export interface Update {
  ( airtimeId: string, updates: storageInterfaces.powertel.airtime.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtime.Super>;
}

export interface Remove {
  ( airtimeId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/