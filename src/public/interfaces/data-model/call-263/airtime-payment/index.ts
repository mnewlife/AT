module AirtimePayment {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    user: user.UserInfo;
    channelId: string;
    transaction: Transaction;
  }

  /******************************************************************************/

  export interface Transaction {
    identifier: string;
    amount: number;
    method: string;
  }

  /******************************************************************************/

}