/******************************************************************************/

import * as Promise from "bluebird";

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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( amountsId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super[]>;
}

export interface UpdateById {
  ( amountsId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.amounts.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( amountsId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  type: string;
  count: number; countPlus: number; countMinus: number;
  newStock: number; newStockPlus: number; newStockMinus: number;
  sold: number; soldPlus: number; soldMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  type: string;
  count: Partial<{ min: number; max: number; }>;
  newStock: Partial<{ min: number; max: number; }>;
  sold: Partial<{ min: number; max: number; }>;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "count" | "newStock" | "sold";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

