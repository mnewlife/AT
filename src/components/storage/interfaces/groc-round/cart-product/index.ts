/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.cartProduct.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.cartProduct.Super>;

/******************************************************************************/

export type Context = "GrocRound|CartProduct";

/******************************************************************************/

export interface AddDetails {
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  cartId: string;
  product: dataModel.grocRound.cartProduct.ProductInfo;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  cartId: string;
  product: Partial<dataModel.grocRound.cartProduct.ProductInfo>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  cartId: string;
  product: Partial<{
    productId: string;
    label: string;
    quantity: Partial<{ min: number, max: number }>;
    value: Partial<{ min: number, max: number }>;
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

