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
  ( filtrationCriteria: interfaces.dataModel.getParams.product.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.progression.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( progressionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  subject: interfaces.dataModel.ProgressionSubject;
  timeMeasure: interfaces.dataModel.ProgressionTimeMeasure;
}

export interface AddBatch {
  ( progressions: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, subject: interfaces.dataModel.ProgressionSubject, timeMeasure: interfaces.dataModel.ProgressionTimeMeasure, forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  subject?: interfaces.dataModel.ProgressionSubject;
  timeMeasure?: interfaces.dataModel.ProgressionTimeMeasure;
  amounts?: interfaces.dataModel.ProgressionAmounts;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.product.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel[]>;
}

export interface UpdateById {
  ( progressionId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.ProgressionModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.product.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( progressionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
