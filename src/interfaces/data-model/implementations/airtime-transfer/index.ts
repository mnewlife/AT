/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId?: mongoose.Types.ObjectId;

  channelId?: mongoose.Types.ObjectId;

  paymentId?: mongoose.Types.ObjectId;

  transferIdentifier?: string;

  transferAmountMin?: number;
  transferAmountMax?: number;

  paymentRecorded?: boolean;

  textSearch?: string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "transferAmount";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/
