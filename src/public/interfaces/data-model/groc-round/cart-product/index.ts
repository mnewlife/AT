module CartProduct {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;
  import round = Round;
  import product = Product;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    user: user.UserInfo;
    round: round.RoundInfo;
    cartId: string;
    product: ProductInfo;
  }
  
  export interface ProductInfo extends product.ProductInfo {
    quantity: number;
    value: number;
  }

  /******************************************************************************/

}