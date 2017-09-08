/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newCardStock.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newCardStock.Super>;

/******************************************************************************/

export type Context = "Powertel|NewCardStock";

/******************************************************************************/

export interface AddDetails {
  mdnRange?: {
    min: number;
    max: number;
  };
  initialCount: number;
  newCount: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  mdnRange: Partial<{
    min: number;
    max: number;
  }>;
  initialCount: number;
  newCount: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  mdnRange: {
    min: Partial<{ min: number; max: number; }>;
    max: Partial<{ min: number; max: number; }>;
  };
  initialCount: Partial<{ min: number; max: number; }>;
  newCount: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount" | "newCount" | "initialCount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

