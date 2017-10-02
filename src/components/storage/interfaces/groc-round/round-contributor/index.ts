/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.roundContributor.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.grocRound.roundContributor.Super>;

/******************************************************************************/

export type Context = "GrocRound|RoundContributor";

/******************************************************************************/

export interface AddDetails {
  round: dataModel.grocRound.round.RoundInfo;
  user: dataModel.core.user.Super;
  contributions: dataModel.grocRound.roundContributor.Contributions;
  tracks: dataModel.grocRound.roundContributor.TrackInfo[];
  cart: {
    num: number;
    value: number;
  };
  deliveryFees: {
    valuePaid: number;
    valueDue: number;
  };
  complete: boolean;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  user: Partial<dataModel.core.user.Super>;
  contributions: Partial<dataModel.grocRound.roundContributor.Contributions>;
  tracks: dataModel.grocRound.roundContributor.TrackInfo[];
  cart: Partial<{
    num: number;
    value: number;
  }>;
  deliveryFees: Partial<{
    valuePaid: number;
    valueDue: number;
  }>;
  complete: boolean;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  round: Partial<dataModel.grocRound.round.RoundInfo>;
  user: Partial<dataModel.core.user.Super>;
  contributions: Partial<dataModel.grocRound.roundContributor.Contributions>;
  tracks: string[];
  cart: Partial<{
    num: Partial<{ min: number; max: number; }>;
    value: Partial<{ min: number; max: number; }>;
  }>;
  deliveryFees: Partial<{
    valuePaid: Partial<{ min: number; max: number; }>;
    valueDue: Partial<{ min: number; max: number; }>;
  }>;
  complete: boolean;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numProducts" | "cartNum" | "cartValue"
  | "deliveryFeesPaid" | "deliveryFeesDue";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

