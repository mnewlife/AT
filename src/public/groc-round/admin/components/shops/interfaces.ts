module GrocRoundAdminShopsComponentInterfaces {

  /*******************************************/

  import shop = Shop;
  import profileService = GrocRoundAdminShopsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    shops: shop.Super[];
    progress: profileService.Instance[ "progress" ];
    promises: profileService.Instance[ "promises" ];
    errorMessage: string;
  }

  /*******************************************/

}
