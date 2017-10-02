/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  adminFeePercentage: number;
  numProducts: number;
  valueProducts: number;
}

/******************************************************************************/