/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.round.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.round.Super>;

/******************************************************************************/

export type Context = "GrocRound|Round";

/******************************************************************************/

export interface AddDetails {
  roundName: string;
  inProgress: boolean;
  duration: {
    start: Date;
    end: Date;
    months: number;
  };
  deliveries: {
    fee: number;
    numPayments: number;
    valuePayments: number;
  };
  contributions: {
    num: number;
    value: number;
  };
  numTracks: number;
  valueCartProducts: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  roundName: string;
  inProgress: boolean;
  duration: Partial<{
    start: Date;
    end: Date;
    months: number;
  }>;
  deliveries: Partial<{
    fee: number;
    numPayments: number;
    valuePayments: number;
  }>;
  contributions: Partial<{
    num: number;
    value: number;
  }>;
  numTracks: number;
  valueCartProducts: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  roundName: string;
  inProgress: boolean;
  duration: Partial<{
    start: Date;
    end: Date;
    months: Partial<{ min: number; max: number; }>;
  }>;
  deliveries: Partial<{
    fee: Partial<{ min: number; max: number; }>;
    numPayments: Partial<{ min: number; max: number; }>;
    valuePayments: Partial<{ min: number; max: number; }>;
  }>;
  contributions: Partial<{
    num: Partial<{ min: number; max: number; }>;
    value: Partial<{ min: number; max: number; }>;
  }>;
  numTracks: Partial<{ min: number; max: number; }>;
  valueCartProducts: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numProducts" | "durationStart" | "durationEnd"
  | "durationMonths" | "deliveryFee" | "deliveryFeeNumPayments" | "deliveryFeeValuePayments"
  | "numContributions" | "valueContributions" | "numTracks" | "valueCartProducts";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

