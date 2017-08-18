/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.airtimePayment.Super, dataModel.call263.airtimePayment.Super[]>;
export type Events = eventGenerator.Generate<"Call263|AirtimePayment", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.airtimePayment.Super[]>;

/******************************************************************************/

export interface AddDetails {
  user: dataModel.core.user.UserInfo;
  channelId: string;
  transaction: dataModel.call263.airtimePayment.Transaction;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  channelId: string;
  transaction: Partial<dataModel.call263.airtimePayment.Transaction>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  channelId: string;
  transaction: Partial<{
    identifier: string;
    amount: Partial<{ min: number; max: number }>;
    method: string;
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

