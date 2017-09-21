module NewRouterStock {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    type: string;
    initialCount: number;
    newCount: number;
    amount: number;
  }

  /******************************************************************************/

}