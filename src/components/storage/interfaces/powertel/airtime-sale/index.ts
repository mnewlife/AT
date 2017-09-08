/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.airtimeSale.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.airtimeSale.Super>;

/******************************************************************************/

export type Context = "Powertel|AirtimeSale";

/******************************************************************************/

export interface AddDetails {
  buyerName: string;
  card?: {
    cardId: string;
    mdn: number;
  };
  user?: dataModel.core.user.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  buyerName: string;
  card: Partial<{
    cardId: string;
    mdn: number;
  }>;
  user: Partial<dataModel.core.user.UserInfo>;
  amount: number;
  bundles: Partial<{
    gb: number;
    days: number;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  buyerName: string;
  card: {
    cardId: string;
    mdn: Partial<{ min: number; max: number; }>;
  };
  user: Partial<dataModel.core.user.UserInfo>;
  amount: Partial<{ min: number; max: number; }>;
  bundles?: {
    gb: Partial<{ min: number; max: number; }>;
    days: Partial<{ min: number; max: number; }>;
  };
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "mdn" | "amount" | "gb" | "days";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

