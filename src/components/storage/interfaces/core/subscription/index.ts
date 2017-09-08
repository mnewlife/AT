/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.subscription.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.subscription.Super>;

/******************************************************************************/

export type Context = "Core|Subscription";

/******************************************************************************/

export interface AddDetails {
  userId: string;
  subscription: string;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  userId: string;
  subscription: string;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  userId: string;
  subscription: string;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

