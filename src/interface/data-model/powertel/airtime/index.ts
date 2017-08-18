/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}

/******************************************************************************/