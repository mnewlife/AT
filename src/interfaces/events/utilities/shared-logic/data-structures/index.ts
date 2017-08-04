/******************************************************************************/

import * as express from "express";

import * as interfaces from "../../../../../interfaces/index";

/******************************************************************************/

type Happening = interfaces.dataModel.Happening;
type context = "DataStructures";

/******************************************************************************/

export interface FindInArrayInvalidCriteriaData {
  arr: any[],
  id: string;
  criteria: string;
};
export interface FindInArrayInvalidCriteria extends Happening {
  context: context;
  identifier: "FindInArrayInvalidCriteria";
  data: FindInArrayInvalidCriteriaData;
}

export interface FindInArrayFailedData {
  arr: any[],
  id: string;
  criteria: string;
  reason: any;
};
export interface FindInArrayFailed extends Happening {
  context: context;
  identifier: "FindInArrayFailed";
  data: FindInArrayFailedData;
}

/******************************************************************************/

export interface RemoveFromArrayFailedData {
  arr: any[];
  identifier: string;
  reason: any;
};
export interface RemoveFromArrayFailed extends Happening {
  context: context;
  identifier: "RemoveFromArrayFailed";
  data: RemoveFromArrayFailedData;
}

/******************************************************************************/

export interface PushToArrayFailedData {
  items: any[];
  destination: any[];
  reason: any;
}
export interface PushToArrayFailed extends Happening {
  context: context;
  identifier: "PushToArrayFailed";
  data: PushToArrayFailedData;
}

/******************************************************************************/

export interface MapDetailsFailedData {
  details: any;
  destination: any;
  reason: any;
};
export interface MapDetailsFailed extends Happening {
  context: context;
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
export interface SortObjectArrayFailed extends Happening {
  context: context;
  identifier: "SortObjectArrayFailed";
  data: SortObjectArrayFailedData;
}

/******************************************************************************/
