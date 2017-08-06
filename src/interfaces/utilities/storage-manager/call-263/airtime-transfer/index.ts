/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super[]>;
}

export interface UpdateById {
  ( airtimeTransferId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.call263.airtimeTransfer.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( airtimeTransferId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: interfaces.dataModel.call263.airtimeTransfer.Transfer;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: Partial<interfaces.dataModel.call263.airtimeTransfer.Transfer>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: Partial<interfaces.dataModel.call263.airtimeTransfer.Transfer>;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

