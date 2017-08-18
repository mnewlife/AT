/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/