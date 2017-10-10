module GrocRoundAdminCartsServiceInterfaces {

  /*******************************************/

  import cart = Cart;
  import user = User;
  import round = Round;

  export interface Instance {
    getCarts: GetCarts;
    getCart: GetCart;
    updateCart: UpdateCart;
  }

  /*******************************************/

  export type UpdateDetails = Partial<{
    user: user.UserInfo;
    round: round.RoundInfo;
    adminFeePercentage: number;
  }>;

  /*******************************************/

  export interface GetCarts {
    ( roundId: string ): ng.IPromise<cart.Super[]>;
  }

  export interface GetCart {
    ( cartId: string ): ng.IPromise<cart.Super>;
  }

  export interface UpdateCart {
    ( cartId: string, details: UpdateDetails ): ng.IPromise<cart.Super>;
  }

  /*******************************************/

}
