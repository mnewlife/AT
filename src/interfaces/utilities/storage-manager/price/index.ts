/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/price/index";
import * as getParams from "../../../../interfaces/data-model/get-params/price/index";
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
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.PriceModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( priceId: string, forceThrow?: boolean ): Promise<dataImplementations.PriceModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  productId: string;
  shopId: string;
  quantity: number;
  price: number;
}

export interface AddBatch {
  ( prices: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.PriceModel[]>;
}

export interface Add {
  ( productId: string, shopId: string, quantity: number, price: number, forceThrow?: boolean ): Promise<dataImplementations.PriceModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  productId?: string;
  shopId?: string;
  quantity?: number;
  price?: number;
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.PriceModel[]>;
}

export interface UpdateById {
  ( priceId: string, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.PriceModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( priceId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
