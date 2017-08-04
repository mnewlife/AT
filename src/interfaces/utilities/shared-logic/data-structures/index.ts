/******************************************************************************/

import * as express from "express";
import * as Promise from "bluebird";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/shared-logic/data-structures/index";

/******************************************************************************/

export interface Emitter {
  findInArrayInvalidCriteria: ( params: events.FindInArrayInvalidCriteriaData ) => events.FindInArrayInvalidCriteria;
  findInArrayFailed: ( params: events.FindInArrayFailedData ) => events.FindInArrayFailed;
  removeFromArrayFailed: ( params: events.RemoveFromArrayFailedData ) => events.RemoveFromArrayFailed;
  pushToArrayFailed: ( params: events.PushToArrayFailedData ) => events.PushToArrayFailed;
  mapDetailsFailed: ( params: events.MapDetailsFailedData ) => events.MapDetailsFailed;
  sortObjectArrayFailed: ( params: events.SortObjectArrayFailedData ) => events.SortObjectArrayFailed;
}

export interface Params {
  
}

export interface FindInArray {
  ( arr: any[], id: string, criteria: string, forceThrow?: boolean ): Promise<any>;
};

export interface RemoveFromArray {
  ( arr: any[], identifier: string | any, forceThrow?: boolean ): Promise<any>;
};

export interface PushToArray {
  ( items: any[], destination: any[], forceThrow?: boolean ): Promise<any>;
}

export interface MapDetails {
  ( details: any, destination: any, forceThrow?: boolean ): Promise<any>;
}

export interface SortObjectArray {
  ( array: any[], criteria: string, order: "Ascending" | "Descending", forceThrow?: boolean ): Promise<any>;
}

/******************************************************************************/
