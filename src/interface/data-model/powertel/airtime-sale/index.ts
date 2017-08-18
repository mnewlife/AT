/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  buyerName: string;
  card?: CardInfo;
  user?: dataModel.core.user.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

export interface CardInfo extends dataModel.DataModel {
  cardId: string;
  mdn: number;
}

/******************************************************************************/