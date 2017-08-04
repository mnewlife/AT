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
  ( filtrationCriteria: interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.deliveryFee.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( deliveryFeeId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  payment: interfaces.dataModel.DeliveryFeePaymentDetails;
}

export interface AddBatch {
  ( deliveryFees: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, roundId: mongoose.Types.ObjectId, payment: interfaces.dataModel.DeliveryFeePaymentDetails, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  roundId?: mongoose.Types.ObjectId;
  payment?: {
    identifier?: string;
    amount?: number;
    method?: string;
  };
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

export interface UpdateById {
  ( deliveryFeeId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.deliveryFee.FiltrationCriteria, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

export interface RemoveById {
  ( deliveryFeeId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/
