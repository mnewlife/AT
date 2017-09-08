/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.event.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.event.Super>;

/******************************************************************************/

export type Context = "Core|Event";

/******************************************************************************/

export interface AddDetails {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  context: string;
  identifier: string;
  tagsToAdd: string[];
  tagsToRemove: string[];
  data: any;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  context: string;
  identifier: string;
  tags: string[];
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

