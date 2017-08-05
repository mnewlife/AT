/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

/******************************************************************************/

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue {
  shopId: string;
  price: number;
};

/******************************************************************************/