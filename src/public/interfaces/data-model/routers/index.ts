module Routers {

  /******************************************************************************/

  import amounts = Amounts;
  import newRouterStock = NewRouterStock;
  import sale = Sale;

  /******************************************************************************/

  export type ModelRange = amounts.Super | newRouterStock.Super | sale.Super;
  export type ModelArrayRange = amounts.Super[] | newRouterStock.Super[] | sale.Super[];

  /******************************************************************************/


}