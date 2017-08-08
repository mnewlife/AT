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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( eventId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super[]>;
}

export interface UpdateById {
  ( eventId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.cardSale.Super>;
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
  cardId: string;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  cardId: string;
  mdn: number;
  cost: number;
  conditions: Partial<{
    withRouter: boolean;
    routerType: string;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  cardId: string;
  mdn: number;
  cost: number;
  conditions: Partial<{
    withRouter: boolean;
    routerType: string;
  }>;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "cost" | "mdn";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

