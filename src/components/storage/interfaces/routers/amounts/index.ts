/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.amounts.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.amounts.Super>;

/******************************************************************************/

export type Context = "Routers|Amounts";

/******************************************************************************/

export interface AddDetails {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  type: string;
  count: number; countPlus: number; countMinus: number;
  newStock: number; newStockPlus: number; newStockMinus: number;
  sold: number; soldPlus: number; soldMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  type: string;
  count: Partial<{ min: number; max: number; }>;
  newStock: Partial<{ min: number; max: number; }>;
  sold: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "count" | "newStock" | "sold";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

