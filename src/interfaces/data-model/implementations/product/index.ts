/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface FiltrationCriteria {
  label? : string;

  images? : string[];

  effectivePriceMin? : number;
  effectivePriceMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "effectivePrice";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
