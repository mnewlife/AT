module GrocRoundAdminProductsComponentInterfaces {
  
    /*******************************************/
  
    import product = Product;
    import profileService = GrocRoundAdminProductsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      products: product.Super[];
      progress: profileService.Instance[ "progress" ];
      promises: profileService.Instance[ "promises" ];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  