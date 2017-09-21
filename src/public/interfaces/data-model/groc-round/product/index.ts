module Product {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
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
    shopId?: string;
    price: number;
  };

  /******************************************************************************/

}