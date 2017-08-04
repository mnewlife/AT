/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces/index";
import * as events from "../../../../interfaces/events/utilities/storage-manager/user/index";
import * as getParams from "../../../../interfaces/data-model/get-params/user/index";
import * as dataImplementations from "../../../../interfaces/data-model/implementations/index";

/******************************************************************************/

export interface Emitter {
  readonly got: ( params: events.GotData ) => events.Got;
  readonly getFailed: ( params: events.GetFailedData ) => events.GetFailed;
  readonly gotById: ( params: events.GotByIdData ) => events.GotById;
  readonly getByIdFailed: ( params: events.GetByIdFailedData ) => events.GetByIdFailed;
  readonly added: ( params: events.AddedData ) => events.Added;
  readonly addFailed: ( params: events.AddFailedData ) => events.AddFailed;
  readonly updated: ( params: events.UpdatedData ) => events.Updated;
  readonly updateFailed: ( params: events.UpdateFailedData ) => events.UpdateFailed;
  readonly removed: ( params: events.RemovedData ) => events.Removed;
  readonly removeFailed: ( params: events.RemoveFailedData ) => events.RemoveFailed;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: getParams.FiltrationCriteria, sortCriteria: getParams.SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataImplementations.UserModel[]>;
}

/******************************************************************************/

export interface GetById {
  ( userId: string, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

/******************************************************************************/

export interface AddBatchParams {
  emailAddress: string;
  password: string;
  accessLevel: interfaces.dataModel.AccessLevel;
  verificationCode: string;
}

export interface AddBatch {
  ( users: AddBatchParams[], forceThrow?: boolean ): Promise<dataImplementations.UserModel[]>;
}

export interface Add {
  ( emailAddress: string, password: string, accessLevel: interfaces.dataModel.AccessLevel, verificationCode: string, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

/******************************************************************************/

export interface UpdateDetails {
  emailAddress?: string;
  password?: string;
  accessLevel?: interfaces.dataModel.AccessLevel;

  verified?: boolean;
  verificationCode?: string;
  numVerAttempts?: number;

  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  age?: number;
  gender?: "Male" | "Female";

  phoneNumbers?: string[];

  country?: string;
  province?: string;
  address?: string;

  activeApps?: string[];
}

export interface Update {
  ( filtrationCriteria: getParams.FiltrationCriteria, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.UserModel[]>;
}

export interface UpdateById {
  ( userId: string, details: UpdateDetails, forceThrow?: boolean ): Promise<dataImplementations.UserModel>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: getParams.FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/
