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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( saleId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super[]>;
}

export interface UpdateById {
  ( saleId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.routers.sale.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( saleId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  buyer: {
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  };
  simCard?: {
    cardId: string;
    mdn: number;
  };
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  buyer: Partial<{
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  }>;
  simCard: Partial<{
    cardId: string;
    mdn: number;
  }>;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  buyer: Partial<{
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  }>;
  simCard?: Partial<{
    cardId: string;
    mdn: number;
  }>;
  type: string;
  paymentMethod: string;
  unitCost: { min?: number; max?: number; };
  amount: { min?: number; max?: number; };
  totalCost: { min?: number; max?: number; };
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount" | "totalCost";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

