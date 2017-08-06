/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}

/******************************************************************************/