/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

/******************************************************************************/