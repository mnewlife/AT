module GrocRoundAdminShopComponentInterfaces {

  /*******************************************/

  import shop = Shop;
  import shopsService = GrocRoundAdminShopsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    shop: shop.Super;

    loading: boolean;
    deleting: boolean;
    
    errorMessage: string;
    
    deleteShop: DeleteShop;
  }

  /*******************************************/
  
  export interface DeleteShop {
    ( shopId: string ): any;
  }

  /*******************************************/

}
