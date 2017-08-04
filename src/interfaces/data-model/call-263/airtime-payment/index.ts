/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  emailAddress: string;
  accessLevel: interfaces.dataModel.AccessLevel;
  password: string;
  resetCode?: string;
  verification: Verification;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;
  activeApps: interfaces.AppName[];
}
export interface Super_Partial extends Partial<Pick<Super, SuperPartial_Details_Flat>> {
  verification?: Verification_Partial;
  personalDetails?: PersonalDetails_Partial;
  contactDetails?: ContactDetails_Partial;
};
type SuperPartial_Details_Flat = "emailAddress" | "accessLevel" | "password"
  | "resetCode" | "activeApps";

/******************************************************************************/

export interface Verification extends interfaces.dataModel.DataModel {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}
export type Verification_Partial = Partial<Verification>;

/******************************************************************************/

export interface PersonalDetails extends interfaces.dataModel.DataModel {
  firstName: string;
  lastName: string;
}
export type PersonalDetails_Partial = Partial<PersonalDetails>;

/******************************************************************************/

export interface ContactDetails extends interfaces.dataModel.DataModel {
  phoneNumbers: string[];
}
export type ContactDetails_Partial = Partial<ContactDetails>;

/******************************************************************************/