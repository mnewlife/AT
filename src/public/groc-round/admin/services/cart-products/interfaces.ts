module GrocRoundAdminCartProductsServiceInterfaces {

  /*******************************************/

  import cartProduct = CartProduct;
  import user = User;
  import round = Round;

  export interface Instance {
    getCartProducts: GetCartProducts;
    getCartProduct: GetCartProduct;
    addCartProduct: AddCartProduct;
    updateCartProduct: UpdateCartProduct;
    removeCartProduct: RemoveCartProduct;
  }

  /*******************************************/

  export interface AddDetails {
    user: user.UserInfo;
    round: round.RoundInfo;
    cartId: string;
    product: cartProduct.ProductInfo;
  }
  
  /******************************************************************************/
  
  export type UpdateDetails = Partial<{
    product: Partial<cartProduct.ProductInfo>;
  }>;

  /*******************************************/

  export interface GetCartProducts {
    ( cartId: string ): ng.IPromise<cartProduct.Super[]>;
  }

  export interface GetCartProduct {
    ( cartProductId: string ): ng.IPromise<cartProduct.Super>;
  }

  export interface AddCartProduct {
    ( details: AddDetails ): ng.IPromise<cartProduct.Super>;
  }

  export interface UpdateCartProduct {
    ( cartProductId: string, details: UpdateDetails ): ng.IPromise<cartProduct.Super>;
  }

  export interface RemoveCartProduct {
    ( cartProductId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
