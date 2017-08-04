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
  ( filtrationCriteria: interfaces.dataModel.getParams.round.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.round.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.RoundModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( roundId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.RoundModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  roundName: string;
  duration: interfaces.dataModel.RoundDuration;
  deliveryFee?: number;
}

export interface AddBatch {
  ( rounds: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.RoundModel[]>;
}

export interface Add {
  ( roundName: string, duration: interfaces.dataModel.RoundDuration, deliveryFee?: number, forceThrow?: boolean ): Promise<dataImplementations.RoundModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  roundName?: string;
  inProgress?: boolean;
  duration?: interfaces.dataModel.RoundDuration;
  deliveryFee?: number;
  numContributions?: number;
  totalValueContributions?: number;
  numContributors?: number;
  numDeliveryFees?: number;
  totalDeliveryFees?: number;
  numTracks?: number;
  totalValueCartProducts?: number;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.round.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.RoundModel[]>;
}

export interface UpdateById {
  ( roundId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.RoundModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.round.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( roundId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
