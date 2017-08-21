/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.product.Super>;
export type Events = eventGenerator.GenerateMethods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.product.Super>;

/******************************************************************************/

export type Context = "GrocRound|Product";

/******************************************************************************/

export interface AddDetails {
  label: string;
  images?: string[];
  priceValues: dataModel.grocRound.product.PriceValues;
  effectivePrice: dataModel.grocRound.product.PriceValue
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  label: string;
  imagesToAdd: string[];
  imagesToRemove: string[];
  priceValues: dataModel.grocRound.product.PriceValues;
  effectivePrice: dataModel.grocRound.product.PriceValue
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  label: string;
  images: string[];
  priceValues: Partial<{
    min: Partial<{
      shopId: string;
      price: Partial<{ min: number; max: number; }>
    }>;
    max: Partial<{
      shopId: string;
      price: Partial<{ min: number; max: number; }>
    }>;
    median: Partial<{
      shopId: string;
      price: Partial<{ min: number; max: number; }>
    }>;
    mean: Partial<{
      shopId: string;
      price: Partial<{ min: number; max: number; }>
    }>;
  }>;
  effectivePrice: Partial<{
    shopId: string;
    price: Partial<{ min: number; max: number; }>
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "effectivePrice";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

