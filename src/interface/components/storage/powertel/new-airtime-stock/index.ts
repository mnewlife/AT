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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super[]>;
}

export interface UpdateById {
  ( newAirtimeStockId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.newAirtimeStock.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( newAirtimeStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  initialBalance: number;
  newBalance: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  initialBalance: number;
  newBalance: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  initialBalance: Partial<{ min: number; max: number; }>;
  newBalance: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

