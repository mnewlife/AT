module GrocRoundAdminCartComponentInterfaces {

  /*******************************************/

  import cart = Cart;
  import cartsService = GrocRoundAdminCartsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    cart: cart.Super;

    loading: boolean;

    errorMessage: string;
  }

  /*******************************************/

}
