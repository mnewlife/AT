/******************************************************************************/

import * as moders from "../moders/interfaces";

import * as events from "./events/interfaces";

/******************************************************************************/

export interface Constructor {
  new( events: events.Instance, checkThrow: moders.CheckThrow ): Instance;
}

export interface Instance {
  readonly mapDetails: MapDetails;
  readonly sortObjectArray: SortObjectArray;
}

export interface MapDetails {
  ( details: any, destination: any, forceThrow?: boolean ): Promise<any>;
}

export interface SortObjectArray {
  ( array: any[], criteria: string, order: "Ascending" | "Descending", forceThrow?: boolean ): Promise<any[]>;
}

/******************************************************************************/