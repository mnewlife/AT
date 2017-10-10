module GrocRoundAdminAddPriceServiceInterfaces {

  /*******************************************/

  import shop = Shop;

  export interface Instance {
    shops: shop.Super[];
    shopId: string;
    quantity: number;
    price: number;

    error: string;

    add: Add;
    cancel: Cancel;
  }

  export interface Add {
    (): any;
  }

  export interface Cancel {
    (): any;
  }

  /*******************************************/

}
