/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/