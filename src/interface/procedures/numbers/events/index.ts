/******************************************************************************/

import * as src from "../../../../../src";

/******************************************************************************/

export interface BaseEvent extends dataModel.Happening {
  context: "Numbers";
}

/******************************************************************************/

export interface GenerateRandomNumberFailedData {
  min: number;
  max: number;
  reason: any;
};
export interface GenerateRandomNumberFailed extends BaseEvent {
  identifier: "GenerateRandomNumberFailed";
  data: GenerateRandomNumberFailedData;
}

/******************************************************************************/
