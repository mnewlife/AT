/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.cardSale.Super, dataModel.powertel.cardSale.Super[]>;
export type Events = eventGenerator.Generate<"Powertel|CardSale", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.cardSale.Super[]>;

/******************************************************************************/

export interface AddDetails {
  cardId: string;
  mdn: number;
  cost: number;
  conditions?: {
    withRouter?: boolean;
    routerType?: string;
  };
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  cardId: string;
  mdn: number;
  cost: number;
  conditions: Partial<{
    withRouter: boolean;
    routerType: string;
  }>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  cardId: string;
  mdn: number;
  cost: number;
  conditions: Partial<{
    withRouter: boolean;
    routerType: string;
  }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "cost" | "mdn";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

