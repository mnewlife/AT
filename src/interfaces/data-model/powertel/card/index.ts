/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: {
    cardSaleId: string;
    fullName: string;
  };
  user?: interfaces.dataModel.core.UserInfo;
}

/******************************************************************************/