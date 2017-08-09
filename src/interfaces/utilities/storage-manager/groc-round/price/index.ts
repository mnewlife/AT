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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( priceId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super[]>;
}

export interface UpdateById {
  ( priceId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.grocRound.price.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( priceId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  productId: string;
  shopId: string;
  quantity: Partial<{ min: number; max: number; }>;
  price: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "quantity" | "price";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

