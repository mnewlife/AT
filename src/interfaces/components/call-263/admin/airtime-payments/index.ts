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
  ( filtrationCriteria: storageManagerInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageManagerInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]>;
}

export interface GetOne {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Add {
  ( airtimePayment: storageManagerInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Update {
  ( airtimePaymentId: string, updates: storageManagerInterfaces.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Remove {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
