/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.contribution.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.contribution.Super>;

/******************************************************************************/

export type Context = "GrocRound|Contribution";

/******************************************************************************/

export interface AddDetails {
  user: dataModel.core.user.UserInfo;
  round: dataModel.grocRound.round.RoundInfo;
  payment: {
    identifier: string;
    amount: number;
    method: string;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  payment: Partial<{
    identifier: string;
    amount: number;
    method: string;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  payment: Partial<{
    identifier: string;
    amount: Partial<{ min: number; max: number; }>;
    method: string;
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

