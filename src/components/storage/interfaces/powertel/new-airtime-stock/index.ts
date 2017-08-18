/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newAirtimeStock.Super, dataModel.powertel.newAirtimeStock.Super[]>;
export type Events = eventGenerator.Generate<"Powertel|NewAirtimeStock", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.newAirtimeStock.Super[]>;

/******************************************************************************/

export interface AddDetails {
  initialBalance: number;
  newBalance: number;
  amount: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  initialBalance: number;
  newBalance: number;
  amount: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  initialBalance: Partial<{ min: number; max: number; }>;
  newBalance: Partial<{ min: number; max: number; }>;
  amount: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

