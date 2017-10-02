/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  label: string;
  images?: string[];
  prices: Price[];
  priceValues: PriceValues;
  effectivePrice: PriceValue;
}

/******************************************************************************/

export interface Price {
  shop: dataModel.grocRound.shop.ShopInfo;
  quantity: number;
  price: number;
};

export interface ProductInfo {
  productId: string;
  label: string;
};

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue {
  shopId?: string;
  price: number;
};

/******************************************************************************/