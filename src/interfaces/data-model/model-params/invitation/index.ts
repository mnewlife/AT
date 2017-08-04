/******************************************************************************/

import * as mongoose from "mongoose";

/******************************************************************************/

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface FiltrationCriteria {
  inviterId? : mongoose.Types.ObjectId;

  app? : interfaces.AppName;

  invitees? : interfaces.dataModel.Invitee[];

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
