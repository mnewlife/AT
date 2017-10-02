/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  cartId: string;
  product: ProductInfo;
}

export interface ProductInfo extends dataModel.grocRound.product.ProductInfo {
  quantity: number;
  value: number;
}

/******************************************************************************/