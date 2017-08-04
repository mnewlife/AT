/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  userId? : mongoose.Types.ObjectId;

  roundId? : mongoose.Types.ObjectId;

  complete? : boolean;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
