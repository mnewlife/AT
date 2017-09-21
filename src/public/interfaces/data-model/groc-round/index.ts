module GrocRound {

  /******************************************************************************/

  import price = Price;
  import product = Product;
  import shop = Shop;

  /******************************************************************************/

  export type ModelRange = price.Super | product.Super | shop.Super;
  export type ModelArrayRange = price.Super[] | product.Super[] | shop.Super[];

  /******************************************************************************/


}