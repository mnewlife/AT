module GrocRoundAdminCartsComponentInterfaces {
  
    /*******************************************/
  
    import cart = Cart;
    import profileService = GrocRoundAdminCartsServiceInterfaces;
  
    /*******************************************/
  
    export interface Instance {
      carts: cart.Super[];
      errorMessage: string;
    }
  
    /*******************************************/
  
  }
  