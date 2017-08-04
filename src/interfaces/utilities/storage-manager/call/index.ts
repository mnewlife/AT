/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as getParams from "../../../../interfaces/data-model/get-params/call/index";
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
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.CallModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( callId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.CallModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  callerId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  calleeId?: mongoose.Types.ObjectId;
  callDetails?: interfaces.dataModel.CallDetails;
}

export interface AddBatch {
  ( calls: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.CallModel[]>;
}

export interface Add {
  ( callerId: mongoose.Types.ObjectId, channelId: mongoose.Types.ObjectId, calleeId?: mongoose.Types.ObjectId, callDetails?: interfaces.dataModel.CallDetails, forceThrow?: boolean ): Promise<dataImplementations.CallModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  callerId?: mongoose.Types.ObjectId;
  channelId?: mongoose.Types.ObjectId;
  calleeId?: mongoose.Types.ObjectId;
  callDetails?: {
    duration: number;
  };
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CallModel[]>;
}

export interface UpdateById {
  ( callId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.CallModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( callId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
