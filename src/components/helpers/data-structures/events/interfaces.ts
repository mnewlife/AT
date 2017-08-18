/******************************************************************************/

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): ClassInstance;
}

export interface ClassInstance {
  readonly mapDetailsFailed: ( data: MapDetailsFailedData ) => MapDetailsFailed;
  readonly sortObjectArrayFailed: ( data: SortObjectArrayFailedData ) => SortObjectArrayFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "DataStructures";
}

/******************************************************************************/

export interface MapDetailsFailed extends BaseEvent {
  identifier: "MapDetailsFailed";
  data: MapDetailsFailedData;
}
export interface MapDetailsFailedData {
  details: any;
  destination: any;
  reason: any;
};

/******************************************************************************/

export interface SortObjectArrayFailed extends BaseEvent {
  identifier: "SortObjectArrayFailed";
  data: SortObjectArrayFailedData;
}
export interface SortObjectArrayFailedData {
  array: any[];
  criteria: string;
  order: "Ascending" | "Descending";
  reason: any;
};

/******************************************************************************/