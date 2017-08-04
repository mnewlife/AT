/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId? : mongoose.Types.ObjectId;

  roundId? : mongoose.Types.ObjectId;

  paymentIdentifier? : string;

  paymentAmountMin? : number;
  paymentAmountMax? : number;

  paymentMethod? : string;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "paymentAmount";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
