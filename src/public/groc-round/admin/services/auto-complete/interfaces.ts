module GrocRoundAdminAutoCompleteServiceInterfaces {

  /*******************************************/

  import product = Product;
  import user = User;
  import round = Round;

  export interface Instance {
    queryProducts: QueryProducts;
    queryUsers: QueryUsers;
    getProduct: GetProduct;
    getUser: GetUser;
    reflectUser: ReflectUser;
    reflectRound: ReflectRound;
    reflectProduct: ReflectProduct;
  }

  /*******************************************/

  export interface QueryProducts {
    ( query: string, productArray: product.ProductInfo[] ): product.ProductInfo[];
  }
  export interface QueryUsers {
    ( query: string, userArray: user.UserInfo[] ): user.UserInfo[];
  }

  export interface GetProduct {
    ( text: string, array: product.ProductInfo[] ): product.ProductInfo;
  }
  export interface GetUser {
    ( text: string, array: user.UserInfo[] ): user.UserInfo;
  }

  export interface ReflectUser {
    ( id: string, users: user.UserInfo[] ): string;
  }

  export interface ReflectRound {
    ( id: string, rounds: round.RoundInfo[] ): string;
  }

  export interface ReflectProduct {
    ( id: string, products: product.ProductInfo[] ): string;
  }

  /*******************************************/

}
