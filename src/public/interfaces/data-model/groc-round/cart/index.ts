module Cart {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;
  import round = Round;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    user: user.UserInfo;
    round: round.RoundInfo;
    adminFeePercentage: number;
    numProducts: number;
    valueProducts: number;
  }

  /******************************************************************************/

}