/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

export interface FiltrationCriteria {
  allocated? : boolean;

  allocatedTo? : mongoose.Types.ObjectId;

  code? : string;

  phoneNumber? : string;

  password? : string;

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
