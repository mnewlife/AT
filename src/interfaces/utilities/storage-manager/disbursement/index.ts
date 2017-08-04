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
  ( filtrationCriteria: interfaces.dataModel.getParams.disbursement.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.disbursement.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( disbursementId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  complete: boolean;
}

export interface AddBatch {
  ( disbursements: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, roundId: mongoose.Types.ObjectId, complete: boolean, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  roundId?: mongoose.Types.ObjectId;
  complete?: boolean;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.disbursement.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel[]>;
}

export interface UpdateById {
  ( disbursementId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.DeliveryFeeModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.disbursement.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( disbursementId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
