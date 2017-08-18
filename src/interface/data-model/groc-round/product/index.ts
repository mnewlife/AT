/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

/******************************************************************************/

export interface PriceValues extends dataModel.DataModel {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue extends dataModel.DataModel {
  shopId?: string;
  price: number;
};

/******************************************************************************/