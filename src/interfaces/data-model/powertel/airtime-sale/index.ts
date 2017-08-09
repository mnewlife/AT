/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  buyerName: string;
  card?: CardInfo;
  user?: interfaces.dataModel.core.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

export interface CardInfo extends interfaces.dataModel.DataModel {
  cardId: string;
  mdn: number;
}

/******************************************************************************/