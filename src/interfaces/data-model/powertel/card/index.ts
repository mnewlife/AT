/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Buyer;
  user?: interfaces.dataModel.core.UserInfo;
}

/******************************************************************************/

export interface Buyer extends interfaces.dataModel.DataModel {
  cardSaleId: string;
  fullName: string;
}

/******************************************************************************/