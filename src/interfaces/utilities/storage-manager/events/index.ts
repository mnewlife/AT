/******************************************************************************/

import * as interfaces from "../../../../interfaces";

import * as call263 from "../call-263";
import * as core from "../core";
import * as grocRound from "../groc-round";
import * as powertel from "../powertel";
import * as routers from "../routers";

/******************************************************************************/

export interface BaseEvent extends interfaces.dataModel.Happening {
  context: call263.events.BaseEvent[ "context" ] | core.events.BaseEvent[ "context" ]
  | grocRound.events.BaseEvent[ "context" ] | powertel.events.BaseEvent[ "context" ]
  | routers.events.BaseEvent[ "context" ];
}

/******************************************************************************/

export type FiltrationCriteriaRange = call263.events.FiltrationCriteriaRange
  | core.events.FiltrationCriteriaRange | grocRound.events.FiltrationCriteriaRange
  | powertel.events.FiltrationCriteriaRange | routers.events.FiltrationCriteriaRange;

/******************************************************************************/

export type AddDetailsRange = call263.events.AddDetailsRange
| core.events.AddDetailsRange | grocRound.events.AddDetailsRange
| powertel.events.AddDetailsRange | routers.events.AddDetailsRange;

export type AddDetailsArrayRange = call263.events.AddDetailsArrayRange
| core.events.AddDetailsArrayRange | grocRound.events.AddDetailsArrayRange
| powertel.events.AddDetailsArrayRange | routers.events.AddDetailsArrayRange;

/******************************************************************************/

export type UpdateDetailsRange = call263.events.UpdateDetailsRange
| core.events.UpdateDetailsRange | grocRound.events.UpdateDetailsRange
| powertel.events.UpdateDetailsRange | routers.events.UpdateDetailsRange;

export type UpdateDetailsArrayRange = call263.events.UpdateDetailsArrayRange
| core.events.UpdateDetailsArrayRange | grocRound.events.UpdateDetailsArrayRange
| powertel.events.UpdateDetailsArrayRange | routers.events.UpdateDetailsArrayRange;

/******************************************************************************/

export type SortOptionsRange = call263.events.SortOptionsRange
| core.events.SortOptionsRange | grocRound.events.SortOptionsRange
| powertel.events.SortOptionsRange | routers.events.SortOptionsRange;

/******************************************************************************/

export type SortCriteriaRange = call263.events.SortCriteriaRange
| core.events.SortCriteriaRange | grocRound.events.SortCriteriaRange
| powertel.events.SortCriteriaRange | routers.events.SortCriteriaRange;

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
  details: AddDetailsRange;
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
