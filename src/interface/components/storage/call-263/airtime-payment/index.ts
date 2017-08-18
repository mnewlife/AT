/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
  readonly got: ( params: events.GotData ) => events.Got;
  readonly getFailed: ( params: events.GetFailedData ) => events.GetFailed;
  readonly gotById: ( params: events.GotByIdData ) => events.GotById;
  readonly getByIdFailed: ( params: events.GetByIdFailedData ) => events.GetByIdFailed;
  readonly added: ( params: events.AddedData ) => events.Added;
  readonly addFailed: ( params: events.AddFailedData ) => events.AddFailed;
  readonly updated: ( params: events.UpdatedData ) => events.Updated;
  readonly updateFailed: ( params: events.UpdateFailedData ) => events.UpdateFailed;
  readonly removed: ( params: events.RemovedData ) => events.Removed;
  readonly removeFailed: ( params: events.RemoveFailedData ) => events.RemoveFailed;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super[]>;
}

export interface UpdateById {
  ( airtimePaymentId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.call263.airtimePayment.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( airtimePaymentId: string, forceThrow?: boolean ): Promise<void>;
}

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

