module Airtime {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    checkpoint: Date;
    newStockValue: number;
    amountSold: number;
    balance: number;
  }

  /******************************************************************************/

}