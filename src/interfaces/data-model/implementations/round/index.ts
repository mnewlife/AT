/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  inProgress? : boolean;

  startMin? : Date;
  startMax? : Date;

  endMin? : Date;
  endMax? : Date;

  span? : string;

  deliveryFeeMin? : number;
  deliveryFeeMax? : number;

  numContributionsMin? : number;
  numContributionsMax? : number;

  totalValueContributionsMin? : number;
  totalValueContributionsMax? : number;

  numContributorsMin? : number;
  numContributorsMax? : number;

  numDeliveryFeesMin? : number;
  numDeliveryFeesMax? : number;

  totalDeliveryFeesMin? : number;
  totalDeliveryFeesMax? : number;

  numTracksMin? : number;
  numTracksMax? : number;

  totalValueCartProductsMin? : number;
  totalValueCartProductsMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "deliveryFee" | "numContributions" | "totalValueContributions" | "numContributors" |
  "numDeliveryFees" | "totalDeliveryFees" | "numTracks" | "totalValueCartProducts";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
