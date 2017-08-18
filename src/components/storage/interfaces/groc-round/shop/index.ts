/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.shop.Super, dataModel.grocRound.shop.Super[]>;
export type Events = eventGenerator.Generate<"GrocRound|Shop", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.shop.Super[]>;

/******************************************************************************/

export interface AddDetails {
  shopName: string;
  images?: string[];
  numProducts: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  shopName: string;
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

