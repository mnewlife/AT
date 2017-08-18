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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super[]>;
}

export interface UpdateById {
  ( newRouterStockId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.routers.newRouterStock.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( newRouterStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  type: string;
  initialCount: Partial<{ min: number; max: number; }>;
  newCount: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "initialCount" | "newCount" | "amount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

