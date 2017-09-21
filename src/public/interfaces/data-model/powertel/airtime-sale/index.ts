module AirtimeSale {

/******************************************************************************/

import dataModel = DataModel;
import user = User;

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  buyerName: string;
  card?: CardInfo;
  user?: user.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

export interface CardInfo {
  cardId: string;
  mdn: number;
}

/******************************************************************************/

}