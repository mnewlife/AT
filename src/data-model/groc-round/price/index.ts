/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

/******************************************************************************/