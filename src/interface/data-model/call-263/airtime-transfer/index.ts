/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Super extends dataModel.DataModel {
  userId: string;
  channelId: string;
  paymentId: string;
  transfer: Transfer;
}

/******************************************************************************/

export interface Transfer extends dataModel.DataModel {
  identifier: string;
  amount: number;
  paymentRecorded: boolean;
}

/******************************************************************************/