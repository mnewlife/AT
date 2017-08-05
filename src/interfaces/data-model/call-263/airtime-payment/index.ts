/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  user: interfaces.dataModel.core.UserInfo;
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