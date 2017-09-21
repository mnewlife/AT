module Amounts {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    type: string;
    count: number;
    newStock: number;
    sold: number;
  }

  /******************************************************************************/

}