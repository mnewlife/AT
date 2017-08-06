/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( airtimeId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super[]>;
}

export interface UpdateById {
  ( airtimeId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.airtime.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( airtimeId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  checkpoint: Date;
  newStockValue: number; newStockValuePlus: number; newStockValueMinus: number;
  amountSold: number; amountSoldPlus: number; amountSoldMinus: number;
  balance: number; balancePlus: number; balanceMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  checkpoint: Partial<{ min: Date; max: Date; }>;
  newStockValue: Partial<{ min: number; max: number; }>;
  amountSold: Partial<{ min: number; max: number; }>;
  balance: Partial<{ min: number; max: number; }>;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "newStockValue" | "amountSold" | "balance";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

