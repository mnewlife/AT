/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId? : mongoose.Types.ObjectId;
  images? : string[];
  tags? : string[];
  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
