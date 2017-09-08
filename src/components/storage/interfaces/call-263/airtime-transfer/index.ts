/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.airtimeTransfer.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.airtimeTransfer.Super>;

/******************************************************************************/

export type Context = "Call263|AirtimeTransfer";

/******************************************************************************/

export interface AddDetails {
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: dataModel.call263.airtimeTransfer.Transfer;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: Partial<dataModel.call263.airtimeTransfer.Transfer>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: Partial<{
    identifier: string;
    amount: Partial<{ min: number; max: number }>;
    paymentRecorded: boolean;
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

