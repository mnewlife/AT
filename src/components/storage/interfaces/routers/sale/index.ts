/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.sale.Super>;
export type Events = eventGenerator.GenerateMethods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.routers.sale.Super>;

/******************************************************************************/

export type Context = "Routers|Sale";

/******************************************************************************/

export interface AddDetails {
  buyer: {
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  };
  simCard?: {
    cardId: string;
    mdn: number;
  };
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  buyer: Partial<{
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  }>;
  simCard: Partial<{
    cardId: string;
    mdn: number;
  }>;
  type: string;
  paymentMethod: string;
  unitCost: number;
  amount: number;
  totalCost: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  buyer: Partial<{
    fullName: string;
    emailAddress?: string;
    phoneNumber?: string;
  }>;
  simCard?: Partial<{
    cardId: string;
    mdn: number;
  }>;
  type: string;
  paymentMethod: string;
  unitCost: { min?: number; max?: number; };
  amount: { min?: number; max?: number; };
  totalCost: { min?: number; max?: number; };
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "amount" | "totalCost";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

