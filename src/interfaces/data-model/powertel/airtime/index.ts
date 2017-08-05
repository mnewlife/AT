/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  checkpoint: {
    date: Date;
    balance: number;
  };
  balance: number;
}

/******************************************************************************/