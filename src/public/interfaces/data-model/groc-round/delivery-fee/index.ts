module DeliveryFee {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;
  import round = Round;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    user: user.UserInfo;
    round: round.RoundInfo;
    payment: {
      identifier: string;
      amount: number;
      method: string;
    };
  }

  /******************************************************************************/

}