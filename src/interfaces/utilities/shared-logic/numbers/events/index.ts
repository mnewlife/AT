/******************************************************************************/

import * as interfaces from "../../../../../interfaces";

/******************************************************************************/

interface BaseEvent extends interfaces.dataModel.Happening {
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
