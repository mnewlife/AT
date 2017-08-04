/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  shopName? : string;

  images? : string;

  numProductsMin? : number;
  numProductsMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" | "numProducts";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
