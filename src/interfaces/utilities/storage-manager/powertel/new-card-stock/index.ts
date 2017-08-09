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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super[]>;
}

export interface UpdateById {
  ( newCardStockId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.newCardStock.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( newCardStockId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  mdnRange: Partial<{
    min: number;
    max: number;
  }>;
  initialCount: number;
  newCount: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  mdnRange: {
    min: Partial<{ min: number; max: number; }>;
    max: Partial<{ min: number; max: number; }>;
  };
  initialCount: Partial<{ min: number; max: number; }>;
  newCount: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount" | "newCount" | "initialCount";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

