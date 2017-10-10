module GrocRoundAdminSuperInfoServiceInterfaces {

  /*******************************************/

  import product = Product;
  import user = User;
  import round = Round;

  export interface Instance {
    users: Users;
    rounds: Rounds;
    products: Products;
  }

  /*******************************************/

  export interface Users {
    ( users: user.Super[] ): user.UserInfo[];
  }

  export interface Rounds {
    ( users: round.Super[] ): round.RoundInfo[];
  }

  export interface Products {
    ( users: product.Super[] ): product.ProductInfo[];
  }

  /*******************************************/

}
