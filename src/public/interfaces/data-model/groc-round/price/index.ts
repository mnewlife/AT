module Price {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    productId: string;
    shopId: string;
    quantity: number;
    price: number;
  }

  /******************************************************************************/

}