/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
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