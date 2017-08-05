/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  card: {
    cardId: string;
    mdn: number;
  };
  cost: number;
}

/******************************************************************************/