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
  ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.subscription.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( subscriptionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  subscription: string;
}

export interface AddBatch {
  ( subscriptions: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, subscription: string, forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  subscription?: string;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel[]>;
}

export interface UpdateById {
  ( subscriptionId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.SubscriptionModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.subscription.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( subscriptionId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
