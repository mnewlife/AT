/******************************************************************************/

import * as src from "../../../../../src";

import * as amounts from "../amounts";
import * as newRouterStock from "../new-router-stock";
import * as sale from "../sale";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Routers|Amounts" | "Routers|NewRouterStock" | "Routers|Sale";
}

/******************************************************************************/

export type FiltrationCriteriaRange = amounts.FiltrationCriteria | newRouterStock.FiltrationCriteria
  | sale.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = amounts.AddDetails | newRouterStock.AddDetails
  | sale.AddDetails;

export type AddDetailsArrayRange = amounts.AddDetails[] | newRouterStock.AddDetails[]
  | sale.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = amounts.UpdateDetails | newRouterStock.UpdateDetails
  | sale.UpdateDetails;

export type UpdateDetailsArrayRange = amounts.UpdateDetails[] | newRouterStock.UpdateDetails[]
  | sale.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = amounts.SortOptions | newRouterStock.SortOptions
  | sale.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = amounts.SortCriteria | newRouterStock.SortCriteria
  | sale.SortCriteria;

/******************************************************************************/

export interface GotData {
  filtrationCriteria: FiltrationCriteriaRange;
  sortCriteria: SortCriteriaRange;
  limit: number;
  ids: string[];
};
export interface Got extends BaseEvent {
  identifier: "Got";
  data: GotData;
}

/******************************************************************************/

export interface GetFailedData {
  filtrationCriteria: FiltrationCriteriaRange;
  sortCriteria: SortCriteriaRange;
  limit: number;
  reason: any
};
export interface GetFailed extends BaseEvent {
  identifier: "GetFailed";
  data: GetFailedData;
}

/******************************************************************************/

export interface GotByIdData {
  id: string;
};
export interface GotById extends BaseEvent {
  identifier: "GotById";
  data: GotByIdData;
}

/******************************************************************************/

export interface GetByIdFailedData {
  id: string;
  reason: any;
};
export interface GetByIdFailed extends BaseEvent {
  identifier: "GetByIdFailed";
  data: GetByIdFailedData;
}

/******************************************************************************/

export interface AddedData {
  documents: dataModel.routers.ModelArrayRange;
};
export interface Added extends BaseEvent {
  identifier: "Added";
  data: AddedData;
}

/******************************************************************************/

export interface AddFailedData {
  details: AddDetailsArrayRange;
  reason: any
};
export interface AddFailed extends BaseEvent {
  identifier: "AddFailed";
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  documents: dataModel.routers.ModelArrayRange;
};
export interface Updated extends BaseEvent {
  identifier: "Updated";
  data: UpdatedData;
}

/******************************************************************************/

export interface UpdateFailedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  updates: UpdateDetailsRange;
  reason: any
};
export interface UpdateFailed extends BaseEvent {
  identifier: "UpdateFailed";
  data: UpdateFailedData;
}

/******************************************************************************/

export interface RemovedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
};
export interface Removed extends BaseEvent {
  identifier: "Removed";
  data: RemovedData;
}

/******************************************************************************/

export interface RemoveFailedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  reason: any
};
export interface RemoveFailed extends BaseEvent {
  identifier: "RemoveFailed";
  data: RemoveFailedData;
}

/******************************************************************************/
