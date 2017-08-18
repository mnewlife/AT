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
  ( filtrationCriteria: storageInterfaces.call263.airtimePayment.FiltrationCriteria, sortCriteria: storageInterfaces.call263.airtimePayment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]>;
}

export interface GetOne {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

export interface Add {
  ( airtimePayment: storageInterfaces.call263.airtimePayment.AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

export interface Update {
  ( airtimePaymentId: string, updates: storageInterfaces.call263.airtimePayment.UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

export interface Remove {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
