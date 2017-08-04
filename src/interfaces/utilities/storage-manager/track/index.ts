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
  ( filtrationCriteria: interfaces.dataModel.getParams.track.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.track.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.TrackModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( trackId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.TrackModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  roundId: mongoose.Types.ObjectId;
  trackName: string;
  contributionValue: number;
  adminFeePercentage: number;
  installmentValues?: interfaces.dataModel.InstallmentValue[];
}

export interface AddBatch {
  ( tracks: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.TrackModel[]>;
}

export interface Add {
  ( roundId: mongoose.Types.ObjectId, trackName: string, contributionValue: number, adminFeePercentage?: number, installmentValues?: interfaces.dataModel.InstallmentValue[], forceThrow?: boolean ): Promise<dataImplementations.TrackModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  roundId?: mongoose.Types.ObjectId;
  trackName?: string;
  contributionValue?: number;
  installmentValues?: interfaces.dataModel.InstallmentValue[];
  adminFeePercentage?: number;
  numProducts?: number;
  costProducts?: number;
  numShops?: number;
  shops?: string[];

  [ index: string ]: any;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.track.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.TrackModel[]>;
}

export interface UpdateById {
  ( trackId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.TrackModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.track.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( trackId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
