/******************************************************************************/

import * as interfaces from "../../../../interfaces";

import * as user from "../user";
import * as event from "../event";
import * as progression from "../progression";
import * as notification from "../notification";
import * as subscription from "../subscription";

import * as customerGroup from "../customer-group";
import * as productType from "../product-type";
import * as product from "../product";
import * as amendmentRequest from "../amendment-request";
import * as order from "../order";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
  context: "User" | "Event" | "Progression" | "Notification" | "Subscription" |
  "CustomerGroup" | "ProductType" | "Product" | "AmendmentRequest" | "Order";
}

/******************************************************************************/

export type FiltrationCriteriaRange = user.FiltrationCriteria | amendmentRequest.FiltrationCriteria
  | customerGroup.FiltrationCriteria | productType.FiltrationCriteria
  | product.FiltrationCriteria | order.FiltrationCriteria

  | event.FiltrationCriteria | progression.FiltrationCriteria
  | notification.FiltrationCriteria | subscription.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = user.AddDetails | amendmentRequest.AddDetails
  | customerGroup.AddDetails | productType.AddDetails
  | product.AddDetails | order.AddDetails

  | event.AddDetails | progression.AddDetails
  | notification.AddDetails | subscription.AddDetails;

export type AddDetailsArrayRange = user.AddDetails[] | amendmentRequest.AddDetails[]
  | customerGroup.AddDetails[] | productType.AddDetails[]
  | product.AddDetails[] | order.AddDetails[]

  | event.AddDetails[] | progression.AddDetails[]
  | notification.AddDetails[] | subscription.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = user.UpdateDetails | amendmentRequest.UpdateDetails
  | customerGroup.UpdateDetails | productType.UpdateDetails
  | product.UpdateDetails | order.UpdateDetails

  | event.UpdateDetails | progression.UpdateDetails
  | notification.UpdateDetails | subscription.UpdateDetails;

export type UpdateDetailsArrayRange = user.UpdateDetails[] | amendmentRequest.UpdateDetails[]
  | customerGroup.UpdateDetails[] | productType.UpdateDetails[]
  | product.UpdateDetails[] | order.UpdateDetails[]

  | event.UpdateDetails[] | progression.UpdateDetails[]
  | notification.UpdateDetails[] | subscription.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = user.SortOptions | amendmentRequest.SortOptions
  | customerGroup.SortOptions | productType.SortOptions
  | product.SortOptions | order.SortOptions

  | event.SortOptions | progression.SortOptions
  | notification.SortOptions | subscription.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = user.SortCriteria | amendmentRequest.SortCriteria
  | customerGroup.SortCriteria | productType.SortCriteria
  | product.SortCriteria | order.SortCriteria

  | event.SortCriteria | progression.SortCriteria
  | notification.SortCriteria | subscription.SortCriteria;

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
  documents: interfaces.dataModel.ModelArrayRange;
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
  documents: interfaces.dataModel.ModelArrayRange;
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
