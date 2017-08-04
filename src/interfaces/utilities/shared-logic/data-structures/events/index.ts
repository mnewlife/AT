/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
  context: "DataStructures";
}

/******************************************************************************/

export interface FindInArrayInvalidCriteriaData {
  arr: any[],
  id: string;
  criteria: string;
};
export interface FindInArrayInvalidCriteria extends BaseEvent {
  identifier: "FindInArrayInvalidCriteria";
  data: FindInArrayInvalidCriteriaData;
}

/******************************************************************************/

export interface FindInArrayFailedData {
  arr: any[],
  id: string;
  criteria: string;
  reason: any;
};
export interface FindInArrayFailed extends BaseEvent {
  identifier: "FindInArrayFailed";
  data: FindInArrayFailedData;
}

/******************************************************************************/

export interface RemoveFromArrayFailedData {
  arr: any[];
  identifier: string;
  reason: any;
};
export interface RemoveFromArrayFailed extends BaseEvent {
  identifier: "RemoveFromArrayFailed";
  data: RemoveFromArrayFailedData;
}

/******************************************************************************/

export interface PushToArrayFailedData {
  items: any[];
  destination: any[];
  reason: any;
}
export interface PushToArrayFailed extends BaseEvent {
  identifier: "PushToArrayFailed";
  data: PushToArrayFailedData;
}

/******************************************************************************/

export interface MapDetailsFailedData {
  details: any;
  destination: any;
  reason: any;
};
export interface MapDetailsFailed extends BaseEvent {
  identifier: "MapDetailsFailed";
  data: MapDetailsFailedData;
}

/******************************************************************************/

export interface SortObjectArrayFailedData {
  array: any,
  criteria: string,
  order: "Ascending" | "Descending",
  reason: any
};
export interface SortObjectArrayFailed extends BaseEvent {
  identifier: "SortObjectArrayFailed";
  data: SortObjectArrayFailedData;
}

/******************************************************************************/
