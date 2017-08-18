/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../src";
import * as events from "./events";

/******************************************************************************/

export interface Events {
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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<dataModel.core.user.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( userId: string, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<dataModel.core.user.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super[]>;
}

export interface UpdateById {
  ( userId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<dataModel.core.user.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( userId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  emailAddress: string;
  accessLevel: dataModel.core.user.AccessLevel;
  password: string;
  resetCode?: string;
  verification: {
    verified: boolean;
    verificationCode: string;
    numVerAttempts: number;
  };
  personalDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "Male" | "Female";
  };
  contactDetails?: {
    phoneNumbers: string[];
  };
  residentialDetails?: {
    country: string;
    province: string;
    address: string;
  };
  activeApps: src.AppName[];
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  emailAddress: string;
  accessLevel: dataModel.core.user.AccessLevel;
  password: string;
  resetCode: string;
  verification: Partial<{
    verified: boolean;
    verificationCode: string;
    numVerAttempts: number; numVerAttemptsPlus: number; numVerAttemptsMinus: number;
  }>;
  personalDetails: Partial<dataModel.core.user.PersonalDetails>;
  contactDetails: Partial<{
    phoneNumbersToAdd: string[];
    phoneNumbersToRemove: string[];
  }>;
  residentialDetails: Partial<dataModel.core.user.ResidentialDetails>;
  activeAppsToAdd: src.AppName[];
  activeAppsToRemove: src.AppName[];
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  emailAddress: string;
  accessLevel: dataModel.core.user.AccessLevel;
  verification: Partial<{
    verified: boolean;
    verificationCode: string;
    numVerAttempts: Partial<{ min: number; max: number; }>;
  }>;
  personalDetails: Partial<{
    firstName: string;
    lastName: string;
    dateOfBirth: Partial<{ min: Date; max: Date; }>;
    gender: "Male" | "Female";
  }>;
  contactDetails: dataModel.core.user.ContactDetails;
  residentialDetails: Partial<dataModel.core.user.ResidentialDetails>;
  activeApps: src.AppName[];
  textSearch?: string;
}>

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numVerAttempts";

export interface SortCriteria extends storage.BaseSortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/