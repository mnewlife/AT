/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.cart.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.cart.Super>;

/******************************************************************************/

export type Context = "GrocRound|Cart";

/******************************************************************************/

export interface AddDetails {
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  adminFeePercentage: number;
  numProducts: number;
  valueProducts: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  adminFeePercentage: number;
  numProducts: number; numProductsPlus: number; numProductsMinus: number;
  valueProducts: number; valueProductsPlus: number; valueProductsMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  adminFeePercentage: Partial<{ min: number; max: number; }>;
  numProducts: Partial<{ min: number; max: number; }>;
  valueProducts: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numProducts" | "valueProducts" | "adminFeePercentage";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

