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
  ( filtrationCriteria: storageInterfaces.call263.airtimeTransfer.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimeTransfer.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>;
}

export interface GetOne {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

export interface MakeTransfer {
  ( channelId: string, amount: number, forceThrow?: boolean ): Promise<any>;
}

export interface RecordTransfer {
  ( airtimeTransfer: storageInterfaces.call263.airtimeTransfer.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

export interface Update {
  ( airtimeTransferId: string, updates: storageInterfaces.call263.airtimeTransfer.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

export interface Remove {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
