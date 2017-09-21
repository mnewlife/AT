/******************************************************************************/

import * as dataModel from "../../../data-model";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  user: dataModel.core.user.UserInfo;
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