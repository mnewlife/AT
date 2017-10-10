module GrocRound {

  /******************************************************************************/

  import product = Product;
  import shop = Shop;

  /******************************************************************************/

  export type ModelRange = product.Super | shop.Super;
  export type ModelArrayRange = product.Super[] | shop.Super[];

  /******************************************************************************/


}