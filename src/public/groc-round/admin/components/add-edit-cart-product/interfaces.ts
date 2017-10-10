module GrocRoundAdminAddEditCartProductComponentInterfaces {

  /*******************************************/

  import cartProductsService = GrocRoundAdminCartProductsServiceInterfaces;
  import cartProduct = CartProduct;

  /*******************************************/

  export interface Instance {
    editMode: boolean;
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;

    addDetails: cartProductsService.AddDetails;
    updateDetails: cartProductsService.UpdateDetails;

    addCartProduct: AddCartProduct;
    updateCartProduct: UpdateCartProduct;
  }

  /*******************************************/

  export interface AddCartProduct {
    ( details: cartProductsService.UpdateDetails ): any;
  }

  export interface UpdateCartProduct {
    ( cartProductId: string, details: cartProductsService.UpdateDetails ): any;
  }

  /*******************************************/

}
