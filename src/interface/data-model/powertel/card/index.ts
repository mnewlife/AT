/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Buyer;
  user?: dataModel.core.user.UserInfo;
}

/******************************************************************************/

export interface Buyer extends dataModel.DataModel {
  cardSaleId: string;
  fullName: string;
}

/******************************************************************************/