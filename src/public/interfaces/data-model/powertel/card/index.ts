module Card {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    pin: number;
    puk: number;
    mdn: number;
    buyer?: Buyer;
    user?: user.UserInfo;
  }

  /******************************************************************************/

  export interface Buyer {
    cardSaleId: string;
    fullName: string;
  }

  /******************************************************************************/

}