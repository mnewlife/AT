module AirtimeTransfer {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    userId: string;
    channelId: string;
    paymentId: string;
    transfer: Transfer;
  }

  /******************************************************************************/

  export interface Transfer {
    identifier: string;
    amount: number;
    paymentRecorded: boolean;
  }

  /******************************************************************************/

}