/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/product/index";
import * as getParams from "../../../../interfaces/data-model/get-params/product/index";
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
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.ProductModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( productId: string, forceThrow?: boolean ): Promise<dataImplementations.ProductModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  label: string;
  images?: string[];
}

export interface AddBatch {
  ( products: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.ProductModel[]>;
}

export interface Add {
  ( label: string, images?: string[], forceThrow?: boolean ): Promise<dataImplementations.ProductModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  label?: string;
  images?: string[];
  priceValues?: interfaces.dataModel.PriceValues;
  effectivePrice?: interfaces.dataModel.PriceValue;
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ProductModel[]>;
}

export interface UpdateById {
  ( productId: string, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ProductModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( productId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
