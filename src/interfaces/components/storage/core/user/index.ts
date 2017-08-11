/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../interfaces";
import * as events from "./events";

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
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( userId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super[]>;
}

export interface UpdateById {
  ( userId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.core.user.Super>;
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
  accessLevel: interfaces.dataModel.core.AccessLevel;
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
  activeApps: interfaces.AppName[];
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  emailAddress: string;
  accessLevel: interfaces.dataModel.core.AccessLevel;
  password: string;
  resetCode: string;
  verification: Partial<{
    verified: boolean;
    verificationCode: string;
    numVerAttempts: number; numVerAttemptsPlus: number; numVerAttemptsMinus: number;
  }>;
  personalDetails: Partial<interfaces.dataModel.core.user.PersonalDetails>;
  contactDetails: Partial<{
    phoneNumbersToAdd: string[];
    phoneNumbersToRemove: string[];
  }>;
  residentialDetails: Partial<interfaces.dataModel.core.user.ResidentialDetails>;
  activeAppsToAdd: interfaces.AppName[];
  activeAppsToRemove: interfaces.AppName[];
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  emailAddress: string;
  accessLevel: interfaces.datModel.core.AccessLevel;
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
  contactDetails: interfaces.dataModel.core.user.ContactDetails;
  residentialDetails: Partial<interfaces.dataModel.core.user.ResidentialDetails>;
  activeApps: interfaces.AppName[];
  textSearch?: string;
}>

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "numVerAttempts";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/