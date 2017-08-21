/******************************************************************************/

import * as Promise from "bluebird";

import * as dataModel from "../../../data-model";
import * as storage from "./index";

/******************************************************************************/

export interface Get<FiltrationCriteria, SortCriteria extends storage.BaseSortCriteria, DataModel extends dataModel.DataModel> {
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<DataModel[]>;
}

/******************************************************************************/

export interface GetById<DataModel extends dataModel.DataModel> {
  ( entityId: string, forceThrow?: boolean ): Promise<DataModel>;
}

/******************************************************************************/

export interface AddBatch<AddDetails, DataModel extends dataModel.DataModel> {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<DataModel[]>;
}

export interface Add<AddDetails, DataModel extends dataModel.DataModel> {
  ( details: AddDetails, forceThrow?: boolean ): Promise<DataModel>;
}

/******************************************************************************/

export interface Update<FiltrationCriteria, UpdateDetails, DataModel extends dataModel.DataModel> {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<DataModel[]>;
}

export interface UpdateById<UpdateDetails, DataModel extends dataModel.DataModel> {
  ( entityId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<DataModel>;
}

/******************************************************************************/

export interface Remove<FiltrationCriteria> {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( entityId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/