/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  type: string;
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/