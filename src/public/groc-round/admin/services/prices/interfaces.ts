module GrocRoundAdminPricesServiceInterfaces {

  /*******************************************/

  import price = Price;

  /*******************************************/

  export interface Instance {
    progress: {
      getPrices: boolean;
    };

    getPrices: GetPrices;
    getPrice: GetPrice;
    addPrice: AddPrice;
    updatePrice: UpdatePrice;
    removePrice: RemovePrice;
  }

  /*******************************************/

  export type FiltrationCriteria = Partial<{
    productId: string;
    shopId: string;
    quantity: Partial<{ min: number; max: number; }>;
    price: Partial<{ min: number; max: number; }>;
    textSearch: string;
  }>;

  export interface AddDetails {
    productId: string;
    shopId: string;
    quantity: number;
    price: number;
  }

  export type UpdateDetails = Partial<{
    productId: string;
    shopId: string;
    quantity: number;
    price: number;
  }>;

  /*******************************************/

  export interface GetPrices {
    ( filtrationCriteria: FiltrationCriteria ): ng.IPromise<price.Super[]>;
  }

  export interface GetPrice {
    ( priceId: string ): ng.IPromise<price.Super>;
  }

  export interface AddPrice {
    ( details: AddDetails ): ng.IPromise<price.Super>;
  }

  export interface UpdatePrice {
    ( priceId: string, details: UpdateDetails ): ng.IPromise<price.Super>;
  }

  export interface RemovePrice {
    ( priceId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
