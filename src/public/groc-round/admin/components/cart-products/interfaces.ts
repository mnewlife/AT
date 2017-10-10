module GrocRoundAdminCartProductsComponentInterfaces {

  /*******************************************/

  import cartProduct = CartProduct;
  import profileService = GrocRoundAdminCartProductsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    cartProducts: cartProduct.Super[];
    errorMessage: string;
  }

  /*******************************************/

}
