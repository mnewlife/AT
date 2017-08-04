/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId? : mongoose.Types.ObjectId;

  channelId? : mongoose.Types.ObjectId;

  transactionIdentifier? : string;

  transactionAmountMin? : number;
  transactionAmountMax? : number;

  transactionMethod? : string;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
