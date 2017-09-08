/******************************************************************************/

import * as dataModel from "../../../../data-model";
import * as eventListener from "../../../../event-listener/interfaces";

/******************************************************************************/

export interface Constructor {
  new( emitEvent: eventListener.Emit ): Instance;
}

export interface Instance {
  readonly generateRandomNumberFailed: ( data: GenerateRandomNumberFailedData ) => GenerateRandomNumberFailed;
}

/******************************************************************************/

interface BaseEvent extends dataModel.Happening {
  context: "Numbers";
}

/******************************************************************************/

export interface GenerateRandomNumberFailed extends BaseEvent {
  identifier: "GenerateRandomNumberFailed";
  data: GenerateRandomNumberFailedData;
}
export interface GenerateRandomNumberFailedData {
  min: number;
  max: number;
  reason: any;
};

/******************************************************************************/