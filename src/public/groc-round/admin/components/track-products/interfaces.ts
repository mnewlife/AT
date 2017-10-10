module GrocRoundAdminTrackProductsComponentInterfaces {
  
    /*******************************************/
  
    import trackProduct = TrackProduct;
    import profileService = GrocRoundAdminTrackProductsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      trackProducts: trackProduct.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  