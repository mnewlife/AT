/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Developer extends Super { accessLevel: "developer" };
export interface Admin extends Super { accessLevel: "admin" };
export interface Consumer extends Super { accessLevel: "consumer" };

export interface Super extends interfaces.dataModel.DataModel {
  emailAddress: string;
  accessLevel: interfaces.dataModel.core.AccessLevel;
  password: string;
  resetCode?: string;
  verification: Verification;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;
  residentialDetails?: ResidentialDetails;
  activeApps: string[];
}

/******************************************************************************/

export interface Verification extends interfaces.dataModel.DataModel {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}

/******************************************************************************/

export interface PersonalDetails extends interfaces.dataModel.DataModel {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: number;
  gender: "Male" | "Female";
}

/******************************************************************************/

export interface ContactDetails extends interfaces.dataModel.DataModel {
  phoneNumbers: string[];
}

/******************************************************************************/

export interface ResidentialDetails extends interfaces.dataModel.DataModel {
  country: string;
  province: string;
  address: string;
}

/******************************************************************************/