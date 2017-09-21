/******************************************************************************/

import * as Promise from "bluebird";

import * as src from "../../../../../../src/interfaces";
import * as dataModel from "../../../../../data-model";
import * as storage from "../../../interfaces";
import * as eventGenerator from "../../../interfaces/events/generator";

/******************************************************************************/

export type Instance = storage.ModelController<FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.user.Super>;
export type Events = eventGenerator.Methods<Context, FiltrationCriteria, SortCriteria, AddDetails, UpdateDetails, dataModel.core.user.Super>;

/******************************************************************************/

export type Context = "Core|User";

/******************************************************************************/

export interface AddDetails {
  emailAddress: string;
  accessLevel: dataModel.core.user.AccessLevel;
  password: string;
  resetCode?: string;
  verification: {
    verified: boolean;
    verificationCode?: string;
    numVerAttempts?: number;
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
    phoneNumbers: string[];
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