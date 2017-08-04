/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  trackId? : mongoose.Types.ObjectId;

  productId? : mongoose.Types.ObjectId;

  quantityMin? : number;
  quantityMax? : number;

  priceMin? : number;
  priceMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "quantity" | "price";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
