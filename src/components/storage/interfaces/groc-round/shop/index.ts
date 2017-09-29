/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.shop.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.shop.Super>;

/******************************************************************************/

export type Context = "GrocRound|Shop";

/******************************************************************************/

export interface AddDetails {
  shopName: string;
  images?: string[];
  numProducts: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  shopName: string;
  images: string[];
  imagesToAdd: string[];
  imagesToRemove: string[];
  numProducts: number;
  numProductsPlus: number;
  numProductsMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  shopName: string;
  images: string[];
  numProducts: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numProducts";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

