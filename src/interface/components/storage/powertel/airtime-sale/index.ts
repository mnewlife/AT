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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( eventId: string, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super[]>;
}

export interface UpdateById {
  ( eventId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.powertel.airtimeSale.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( eventId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  buyerName: string;
  card?: {
    cardId: string;
    mdn: number;
  };
  user?: dataModel.core.user.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  buyerName: string;
  card: Partial<{
    cardId: string;
    mdn: number;
  }>;
  user: Partial<dataModel.core.user.UserInfo>;
  amount: number;
  bundles: Partial<{
    gb: number;
    days: number;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  buyerName: string;
  card: {
    cardId: string;
    mdn: Partial<{ min: number; max: number; }>;
  };
  user: Partial<dataModel.core.user.UserInfo>;
  amount: Partial<{ min: number; max: number; }>;
  bundles?: {
    gb: Partial<{ min: number; max: number; }>;
    days: Partial<{ min: number; max: number; }>;
  };
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "mdn" | "amount" | "gb" | "days";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

