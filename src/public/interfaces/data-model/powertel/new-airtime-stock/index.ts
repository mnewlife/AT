module NewAirtimeStock {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    initialBalance: number;
    newBalance: number;
    amount: number;
  }

  /******************************************************************************/

}