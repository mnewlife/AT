/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  got: ( params: any ) => any;
  getFailed: ( params: any ) => any;

  gotById: ( params: any ) => any;
  getByIdFailed: ( params: any ) => any;

  added: ( params: any ) => any;
  addFailed: ( params: any ) => any;

  updated: ( params: any ) => any;
  updateFailed: ( params: any ) => any;

  removed: ( params: any ) => any;
  removeFailed: ( params: any ) => any;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: interfaces.dataModel.getParams.trackProduct.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.trackProduct.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( productId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  trackId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface AddBatch {
  ( products: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel[]>;
}

export interface Add {
  ( trackId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number, price: number, forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  trackId?: mongoose.Types.ObjectId;
  productId?: mongoose.Types.ObjectId;
  quantity?: number;
  price?: number;

  [ index: string ]: any;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.trackProduct.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel[]>;
}

export interface UpdateById {
  ( productId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.TrackProductModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.trackProduct.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( productId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
