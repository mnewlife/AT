/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  callerId? : mongoose.Types.ObjectId;

  channelId? : mongoose.Types.ObjectId;

  calleeId? : mongoose.Types.ObjectId;

  durationMin? : number;
  durationMax? : number;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "duration";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
