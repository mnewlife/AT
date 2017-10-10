module Product {

  /******************************************************************************/

  import dataModel = DataModel;
  import shop = Shop;

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
    shop: shop.ShopInfo;
    quantity: number;
    price: number;
    [ index: string ]: shop.ShopInfo | number;
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
    [ index: string ]: PriceValue;
  };

  export interface PriceValue {
    shopId?: string;
    price: number;
  };

  /******************************************************************************/

}