/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type ClassInstance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.channel.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.call263.channel.Super>;

/******************************************************************************/

export type Context = "Call263|Channel";

/******************************************************************************/

export interface AddDetails {
  allocated: boolean;
  allocatedTo: string;
  code: string;
  phoneNumber: string;
  password: string;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  allocated: boolean;
  allocatedTo: string;
  code: string;
  phoneNumber: string;
  password: string;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  allocated: boolean;
  allocatedTo: string;
  code: string;
  phoneNumber: string;
  password: string;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

