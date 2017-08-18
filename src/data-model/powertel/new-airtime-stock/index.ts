/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  initialBalance: number;
  newBalance: number;
  amount: number;
}

/******************************************************************************/