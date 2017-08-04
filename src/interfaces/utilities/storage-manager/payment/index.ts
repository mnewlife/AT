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
  ( filtrationCriteria: interfaces.dataModel.getParams.payment.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.payment.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.PaymentModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( paymentId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.PaymentModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  transactionDetails: interfaces.dataModel.TransactionDetails;
  transferDone: boolean;
}

export interface AddBatch {
  ( payments: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.PaymentModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, channelId: mongoose.Types.ObjectId, transactionDetails: interfaces.dataModel.TransactionDetails, transferDone: boolean, forceThrow?: boolean ): Promise<dataImplementations.PaymentModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  channelId?: mongoose.Types.ObjectId;
  transactionDetails?: interfaces.dataModel.TransactionDetails;
  transferDone?: boolean;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.payment.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.PaymentModel[]>;
}

export interface UpdateById {
  ( paymentId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.PaymentModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.payment.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( paymentId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
