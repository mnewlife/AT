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
  ( filtrationCriteria: interfaces.dataModel.getParams.contribution.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.contribution.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.ContributionModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( contributionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.ContributionModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  payment: interfaces.dataModel.ContributionPaymentDetails;
}

export interface AddBatch {
  ( contributions: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.ContributionModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, roundId: mongoose.Types.ObjectId, payment: interfaces.dataModel.ContributionPaymentDetails, forceThrow?: boolean ): Promise<dataImplementations.ContributionModel>;
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
  ( filtrationCriteria: interfaces.dataModel.getParams.contribution.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ContributionModel[]>;
}

export interface UpdateById {
  ( contributionId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ContributionModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.contribution.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( contributionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
