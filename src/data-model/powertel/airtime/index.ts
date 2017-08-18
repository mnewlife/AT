/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}

/******************************************************************************/