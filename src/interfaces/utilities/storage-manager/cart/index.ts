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
  ( filtrationCriteria: interfaces.dataModel.getParams.cart.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.cart.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.CartModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( cartId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.CartModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  adminFeePercentage: number;
  numProducts?: number;
  costProducts?: number;
}

export interface AddBatch {
  ( carts: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.CartModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, roundId: mongoose.Types.ObjectId, adminFeePercentage: number, numProducts?: number, costProducts?: number, forceThrow?: boolean ): Promise<dataImplementations.CartModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  roundId?: mongoose.Types.ObjectId;
  adminFeePercentage?: number;
  numProducts?: number;
  costProducts?: number;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.cart.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CartModel[]>;
}

export interface UpdateById {
  ( cartId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CartModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.cart.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( cartId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
