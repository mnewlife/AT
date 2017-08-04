/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as getParams from "../../../../interfaces/data-model/get-params/airtime-transfer/index";

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
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( transferId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel>;
}

/******************************************************************************/

export interface Add {
  ( userId: mongoose.Types.ObjectId, channelId: mongoose.Types.ObjectId, paymentId: mongoose.Types.ObjectId, transferDetails: interfaces.dataModel.TransferDetails, paymentRecorded: boolean, forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel>;
}

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  transferDetails: interfaces.dataModel.TransferDetails;
  paymentRecorded: boolean;
}

export interface AddBatch {
  ( transfers: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel[]>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  channelId?: mongoose.Types.ObjectId;
  paymentId?: mongoose.Types.ObjectId;

  transferDetails?: {
    identifier?: string;
    amount?: number;
  };

  paymentRecorded?: boolean;
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel[]>;
}

export interface UpdateById {
  ( transferId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.AirtimeTransferModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( transferId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
