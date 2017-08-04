/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/shop/index";
import * as getParams from "../../../../interfaces/data-model/get-params/shop/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  readonly got: ( params: events.GotData ) => events.Got;
  readonly getFailed: ( params: events.GetFailedData ) => events.GetFailed;
  readonly gotById: ( params: events.GotByIdData ) => events.GotById;
  readonly getByIdFailed: ( params: events.GetByIdFailedData ) => events.GetByIdFailed;
  readonly added: ( params: events.AddedData ) => events.Added;
  readonly addFailed: ( params: events.AddFailedData ) => events.AddFailed;
  readonly updated: ( params: events.UpdatedData ) => events.Updated;
  readonly updateFailed: ( params: events.UpdateFailedData ) => events.UpdateFailed;
  readonly removed: ( params: events.RemovedData ) => events.Removed;
  readonly removeFailed: ( params: events.RemoveFailedData ) => events.RemoveFailed;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.ShopModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( shopId: string, forceThrow?: boolean ): Promise<dataImplementations.ShopModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  shopName: string;
  images: string[];
}

export interface AddBatch {
  ( shops: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.ShopModel[]>;
}

export interface Add {
  ( shopName: string, images?: string[], forceThrow?: boolean ): Promise<dataImplementations.ShopModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  shopName?: string;
  images?: string[];
  numProducts?: number;

  [ index: string ]: any;
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ShopModel[]>;
}

export interface UpdateById {
  ( shopId: string, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ShopModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( shopId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
