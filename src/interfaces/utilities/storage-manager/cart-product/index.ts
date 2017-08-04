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
  ( filtrationCriteria: interfaces.dataModel.getParams.cartProduct.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.cartProduct.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.CartProductModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( productId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.CartProductModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  cartId: mongoose.Types.ObjectId;
  product: interfaces.dataModel.CartProductDetails;
}

export interface AddBatch {
  ( products: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.CartProductModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, roundId: mongoose.Types.ObjectId, cartId: mongoose.Types.ObjectId, product: interfaces.dataModel.CartProductDetails, forceThrow?: boolean ): Promise<dataImplementations.CartProductModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  roundId?: mongoose.Types.ObjectId;
  cartId?: mongoose.Types.ObjectId;
  product?: {
    productId?: mongoose.Types.ObjectId;
    quantity?: number;
    price?: number;
  };
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.cartProduct.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CartProductModel[]>;
}

export interface UpdateById {
  ( productId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CartProductModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.cartProduct.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( productId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
