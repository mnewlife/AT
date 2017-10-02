/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.progression.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.progression.Super>;

/******************************************************************************/

export type Context = "Core|Progression";

/******************************************************************************/

export interface AddDetails {
  type: string;
  typeId: string;
  subject: string;
  timeMeasure: string;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  type: string;
  typeId: string;
  subject: string;
  timeMeasure: string;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  type: string;
  typeId: string;
  subject: string;
  timeMeasure: string;
  amount: Partial<{ min: number, max: number }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

