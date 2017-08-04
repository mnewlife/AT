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
  ( filtrationCriteria: interfaces.dataModel.getParams.notification.FiltrationCriteria, sortCriteria: interfaces.dataModel.getParams.notification.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.NotificationModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( notificationId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<dataImplementations.NotificationModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  userId: mongoose.Types.ObjectId;
  app: interfaces.AppName;
  type: interfaces.dataModel.NotificationType;
  label: string;
}

export interface AddBatch {
  ( notifications: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.NotificationModel[]>;
}

export interface Add {
  ( userId: mongoose.Types.ObjectId, app: interfaces.AppName, type: interfaces.dataModel.NotificationType, label: string, forceThrow?: boolean ): Promise<dataImplementations.NotificationModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  userId?: mongoose.Types.ObjectId;
  app?: interfaces.AppName;
  type?: interfaces.dataModel.NotificationType;
  label?: string;
  seen?: boolean;
  cleared?: boolean;
}

export interface Update {
  ( filtrationCriteria: interfaces.dataModel.getParams.notification.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.NotificationModel[]>;
}

export interface UpdateById {
  ( notificationId: mongoose.Types.ObjectId, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.NotificationModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: interfaces.dataModel.getParams.notification.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( notificationId: mongoose.Types.ObjectId, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
