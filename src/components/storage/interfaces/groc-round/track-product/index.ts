/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.trackProduct.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.trackProduct.Super>;

/******************************************************************************/

export type Context = "GrocRound|TrackProduct";

/******************************************************************************/

export interface AddDetails {
  track: dataModel.grocRound.track.TrackInfo;
  product: dataModel.grocRound.product.ProductInfo;
  quantity: number;
  value: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  track: Partial<dataModel.grocRound.track.TrackInfo>;
  product: Partial<dataModel.grocRound.product.ProductInfo>;
  quantity: number;
  value: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  track: Partial<dataModel.grocRound.track.TrackInfo>;
  product: Partial<dataModel.grocRound.product.ProductInfo>;
  quantity: Partial<{ min: number; max: number; }>;
  value: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "value" | "quantity";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

