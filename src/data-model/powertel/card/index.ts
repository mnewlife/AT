/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Buyer;
  user?: dataModel.core.user.UserInfo;
}

/******************************************************************************/

export interface Buyer {
  cardSaleId: string;
  fullName: string;
}

/******************************************************************************/