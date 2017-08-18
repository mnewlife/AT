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
  ( filtrationCriteria: storageInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super[]>;
}

export interface GetOne {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimeTransfer.Super>;
}

/******************************************************************************/
