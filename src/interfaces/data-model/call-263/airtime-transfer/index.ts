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

export interface Transfer extends interfaces.dataModel.DataModel {
  identifier: string;
  amount: number;
  paymentRecorded: boolean;
}

/******************************************************************************/