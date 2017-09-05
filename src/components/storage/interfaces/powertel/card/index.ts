/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.card.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.card.Super>;

/******************************************************************************/

export type Context = "Powertel|Card";

/******************************************************************************/

export interface AddDetails {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: {
    cardSaleId: string;
    fullName: string;
  };
  user?: dataModel.core.user.UserInfo;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  pin: number;
  puk: number;
  mdn: number;
  buyer: Partial<{
    cardSaleId: string;
    fullName: string;
  }>;
  user?: Partial<dataModel.core.user.UserInfo>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Partial<{
    cardSaleId: string;
    fullName: string;
  }>;
  user?: Partial<dataModel.core.user.UserInfo>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "mdn";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

