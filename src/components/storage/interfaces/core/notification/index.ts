/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.notification.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.notification.Super>;

/******************************************************************************/

export type Context = "Core|Notification";

/******************************************************************************/

export interface AddDetails {
  user: dataModel.core.user.UserInfo;
  type: string;
  app: src.AppName;
  label: string;
  seen: boolean;
  cleared: boolean;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  type: string;
  app: src.AppName;
  label: string;
  seen: boolean;
  cleared: boolean;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  user: Partial<dataModel.core.user.UserInfo>;
  type: string;
  app: src.AppName;
  label: string;
  seen: boolean;
  cleared: boolean;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

