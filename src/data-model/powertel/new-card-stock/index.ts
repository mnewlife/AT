/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/