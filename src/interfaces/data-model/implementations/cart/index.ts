/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId? : mongoose.Types.ObjectId;

  roundId? : mongoose.Types.ObjectId;

  adminFeePercentageMin? : number;
  adminFeePercentageMax? : number;

  numProductsMin? : number;
  numProductsMax? : number;

  costProductsMin? : number;
  costProductsMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "adminFeePercentage" | "numProducts" | "costProducts";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
