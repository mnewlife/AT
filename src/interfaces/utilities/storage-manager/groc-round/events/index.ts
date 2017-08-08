/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

import * as price from "../price";
import * as product from "../product";
import * as shop from "../shop";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "GrocRound|Price" | "GrocRound|Product" | "GrocRound|Shop";
}

/******************************************************************************/

export type FiltrationCriteriaRange = price.FiltrationCriteria | product.FiltrationCriteria
  | shop.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = price.AddDetails | product.AddDetails
  | shop.AddDetails;

export type AddDetailsArrayRange = price.AddDetails[] | product.AddDetails[]
  | shop.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = price.UpdateDetails | product.UpdateDetails
  | shop.UpdateDetails;

export type UpdateDetailsArrayRange = price.UpdateDetails[] | product.UpdateDetails[]
  | shop.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = price.SortOptions | product.SortOptions
  | shop.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = price.SortCriteria | product.SortCriteria
  | shop.SortCriteria;

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
  documents: interfaces.dataModel.grocRound.ModelArrayRange;
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
  documents: interfaces.dataModel.grocRound.ModelArrayRange;
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
