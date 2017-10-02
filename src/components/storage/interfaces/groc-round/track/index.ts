/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.track.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.track.Super>;

/******************************************************************************/

export type Context = "GrocRound|Track";

/******************************************************************************/

export interface AddDetails {
  round: dataModel.grocRound.round.RoundInfo;
  trackName: string;
  contributions: {
    installmentValue: number;
    totalValue: number;
  };
  adminFeePercentage: number;
  products: {
    num: number;
    value: number;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  trackName: string;
  contributions: Partial<{
    installmentValue: number;
    totalValue: number;
  }>;
  adminFeePercentage: number;
  products: Partial<{
    num: number;
    value: number;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  trackName: string;
  contributions: Partial<{
    installmentValue: Partial<{ min: number; max: number; }>;
    totalValue: Partial<{ min: number; max: number; }>;
  }>;
  adminFeePercentage: Partial<{ min: number; max: number; }>;
  products: Partial<{
    num: Partial<{ min: number; max: number; }>;
    value: Partial<{ min: number; max: number; }>;
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "installmentValue"
  | "contributionsValue" | "adminFeePercentage" | "numProducts" | "valueProducts";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

