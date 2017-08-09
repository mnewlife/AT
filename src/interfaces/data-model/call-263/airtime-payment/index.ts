/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  user: interfaces.dataModel.core.UserInfo;
  channelId: string;
  transaction: Transaction;
}

/******************************************************************************/

export interface Transaction extends interfaces.dataModel.DataModel {
  identifier: string;
  amount: number;
  method: string;
}

/******************************************************************************/