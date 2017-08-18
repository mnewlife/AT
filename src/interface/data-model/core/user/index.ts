/******************************************************************************/

import * as src from "../../../../src";

/******************************************************************************/

export interface Developer extends Super { accessLevel: "developer" };
export interface Admin extends Super { accessLevel: "admin" };
export interface Consumer extends Super { accessLevel: "consumer" };

export interface Super extends dataModel.DataModel {
  emailAddress: string;
  accessLevel: dataModel.core.user.AccessLevel;
  password: string;
  resetCode?: string;
  verification: Verification;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;
  residentialDetails?: ResidentialDetails;
  activeApps: src.AppName[];
}

/******************************************************************************/

export interface Verification extends dataModel.DataModel {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}

/******************************************************************************/

export interface PersonalDetails extends dataModel.DataModel {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "Male" | "Female";
}

/******************************************************************************/

export interface ContactDetails extends dataModel.DataModel {
  phoneNumbers: string[];
}

/******************************************************************************/

export interface ResidentialDetails extends dataModel.DataModel {
  country: string;
  province: string;
  address: string;
}

/******************************************************************************/