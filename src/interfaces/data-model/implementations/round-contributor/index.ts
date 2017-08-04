/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  roundId? : mongoose.Types.ObjectId;

  userId? : mongoose.Types.ObjectId;

  numContributionsMin? : number;
  numContributionsMax? : number;

  totalValueContributionsMin? : number;
  totalValueContributionsMax? : number;

  contributionsDueMin? : number;
  contributionsDueMax? : number;

  trackId? : mongoose.Types.ObjectId;

  numCartProductsMin? : number;
  numCartProductsMax? : number;

  costCartMin? : number;
  costCartMax? : number;

  deliveryFeesPaidMin? : number;
  deliveryFeesPaidMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "numContributions" | "totalValueContributions" | "contributionsDue" |
  "numCartProducts" | "costCart" | "deliveryFeesPaid";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
