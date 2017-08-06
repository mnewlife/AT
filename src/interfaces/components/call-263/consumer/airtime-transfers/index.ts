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
  ( filtrationCriteria: storageManagerInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>;
}

export interface GetOne {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

/******************************************************************************/
