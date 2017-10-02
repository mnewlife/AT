/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  shopName: string;
  images?: string[];
  numProducts: number;
}

export interface ShopInfo {
  shopId: string;
  shopName: string;
};

/******************************************************************************/