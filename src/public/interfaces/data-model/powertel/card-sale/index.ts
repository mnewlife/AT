module CardSale {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    cardId: string;
    mdn: number;
    cost: number;
    conditions?: {
      withRouter?: boolean;
      routerType?: string;
    };
  }

  /******************************************************************************/

}