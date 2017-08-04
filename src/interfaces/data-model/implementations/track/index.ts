/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  roundId? : mongoose.Types.ObjectId;

  trackName? : string;

  contributionValueMin? : number;
  contributionValueMax? : number;

  installmentValueValueMin? : number;
  installmentValueValueMax? : number;

  installmentValueIntervalMin? : number;
  installmentValueIntervalMax? : number;

  adminFeePercentageMin? : number;
  adminFeePercentageMax? : number;

  numProductsMin? : number;
  numProductsMax? : number;

  costProductsMin? : number;
  costProductsMax? : number;

  numShopsMin? : number;
  numShopsMax? : number;

  shops? : string[];

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "contributionValue" | "adminFeePercentage" |
  "numProducts" | "costProducts" | "numShops";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
