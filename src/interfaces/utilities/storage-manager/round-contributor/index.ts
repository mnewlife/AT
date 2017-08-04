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
  ( filtrationCriteria: interfaces.dataModel.getParams.roundContributor.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.roundContributor.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( contributorId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  roundId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

export interface AddBatch {
  ( contributors: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel[]>;
}

export interface Add {
  ( roundId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  roundId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  numContributions?: number;
  totalValueContributions?: number;
  contributionsDue?: number;
  tracks?: interfaces.dataModel.TrackMetaData[];
  numCartProducts?: number;
  costCart?: number;
  deliveryFeesPaid?: number;

  [ index: string ]: any;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.roundContributor.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel[]>;
}

export interface UpdateById {
  ( contributorId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.RoundContributorModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.roundContributor.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( contributorId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
