/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.Generate<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.airtime.Super, dataModel.powertel.airtime.Super[]>;
export type Events = eventGenerator.Generate<"Powertel|Airtime", FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.powertel.airtime.Super[]>;

/******************************************************************************/

export interface AddDetails {
  checkpoint: Date;
  newStockValue: number;
  amountSold: number;
  balance: number;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  checkpoint: Date;
  newStockValue: number; newStockValuePlus: number; newStockValueMinus: number;
  amountSold: number; amountSoldPlus: number; amountSoldMinus: number;
  balance: number; balancePlus: number; balanceMinus: number;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  checkpoint: Partial<{ min: Date; max: Date; }>;
  newStockValue: Partial<{ min: number; max: number; }>;
  amountSold: Partial<{ min: number; max: number; }>;
  balance: Partial<{ min: number; max: number; }>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "newStockValue" | "amountSold" | "balance";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

