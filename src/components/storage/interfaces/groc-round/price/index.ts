/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.price.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.price.Super>;

/******************************************************************************/

export type Context = "GrocRound|Price";

/******************************************************************************/

export interface AddDetails {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  productId: string;
  shopId: string;
  quantity: Partial<{ min: number; max: number; }>;
  price: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "quantity" | "price";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

