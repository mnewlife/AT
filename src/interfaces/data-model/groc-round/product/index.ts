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

export interface PriceValues extends interfaces.dataModel.DataModel {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface PriceValue extends interfaces.dataModel.DataModel {
  shopId?: string;
  price: number;
};

/******************************************************************************/