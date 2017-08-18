/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}

/******************************************************************************/