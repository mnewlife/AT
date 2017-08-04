/******************************************************************************/

import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";

/******************************************************************************/

export interface FiltrationCriteria {
  emailAddress? : string;

  verified? : boolean;

  numVerAttemptsMin? : number;
  numVerAttemptsMax? : number;

  accessLevel? : interfaces.dataModel.AccessLevel;

  ageMin? : number;
  ageMax? : number;

  gender? : "Male" | "Female";

  country? : string;
  province? : string;

  activeApps? : string[];

  textSearch? : string;
}

type SortOptions = "createdAt" | "updatedAt" |
  "numVerAttempts" | "age";

export interface SortCriteria {
  criteria : SortOptions;
  order : "Ascending" | "Descending";
}

/******************************************************************************/
