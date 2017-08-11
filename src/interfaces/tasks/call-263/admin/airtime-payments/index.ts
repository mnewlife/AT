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
  ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super[]>;
}

export interface GetOne {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Add {
  ( airtimePayment: storageInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Update {
  ( airtimePaymentId: string, updates: storageInterfaces.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimePayment.Super>;
}

export interface Remove {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
