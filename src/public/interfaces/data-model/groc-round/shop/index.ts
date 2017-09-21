module Shop {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    shopName: string;
    images?: string[];
    numProducts: number;
  }

  /******************************************************************************/

}