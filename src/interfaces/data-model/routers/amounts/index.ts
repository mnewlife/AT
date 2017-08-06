/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}

/******************************************************************************/