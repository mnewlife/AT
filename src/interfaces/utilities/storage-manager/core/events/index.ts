/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

import * as user from "../user";
import * as event from "../event";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: "Core|User" | "Core|Event";
}

/******************************************************************************/

export type FiltrationCriteriaRange = user.FiltrationCriteria | event.FiltrationCriteria;

/******************************************************************************/

export type AddDetailsRange = user.AddDetails | event.AddDetails;

export type AddDetailsArrayRange = user.AddDetails[] | event.AddDetails[];

/******************************************************************************/

export type UpdateDetailsRange = user.UpdateDetails | event.UpdateDetails;

export type UpdateDetailsArrayRange = user.UpdateDetails[] | event.UpdateDetails[];

/******************************************************************************/

export type SortOptionsRange = user.SortOptions | event.SortOptions;

/******************************************************************************/

export type SortCriteriaRange = user.SortCriteria | event.SortCriteria;

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
  documents: interfaces.dataModel.core.ModelArrayRange;
};
export interface Added extends BaseEvent {
  identifier: "Added";
  data: AddedData;
}

/******************************************************************************/

export interface AddFailedData {
  details: AddDetailsArrayRange;
  reason: any;
};
export interface AddFailed extends BaseEvent {
  identifier: "AddFailed";
  data: AddFailedData;
}

/******************************************************************************/

export interface UpdatedData {
  id?: string;
  conditions?: FiltrationCriteriaRange;
  documents: interfaces.dataModel.core.ModelArrayRange;
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
