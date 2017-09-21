/******************************************************************************/

import * as mongoose from "mongoose";
import * as src from "../../../../../../interfaces";

import * as dataModel from "../../../../../../data-model";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
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
export interface PartialModel extends Partial<Pick<ModelNuance, ModelPartial_Details_Flat>> {
  verification?: Partial<Verification>;
  personalDetails?: Partial<PersonalDetails>;
  contactDetails?: Partial<ContactDetails>;
  residentialDetails?: Partial<ResidentialDetails>;
};
type ModelPartial_Details_Flat = "emailAddress" | "accessLevel" | "password"
  | "resetCode" | "activeApps";

/******************************************************************************/

export interface Verification {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "Male" | "Female";
}

export interface ContactDetails {
  phoneNumbers: string[];
}

export interface ResidentialDetails {
  country: string;
  province: string;
  address: string;
}

/******************************************************************************/

let userSchema = new mongoose.Schema( {

  emailAddress: { type: String, set: ignoreEmpty },
  accessLevel: { type: String, set: ignoreEmpty },
  password: { type: String, set: ignoreEmpty },
  resetCode: { type: String, set: ignoreEmpty },

  verification: {
    verified: { type: Boolean, default: false, set: ignoreEmpty },
    verificationCode: { type: String, set: ignoreEmpty },
    numVerAttempts: { type: Number, min: 0, default: 0, set: ignoreEmpty }
  },

  personalDetails: {
    firstName: { type: String, set: ignoreEmpty },
    lastName: { type: String, set: ignoreEmpty },
    dateOfBirth: { type: Date },
    gender: { type: String, set: ignoreEmpty }
  },

  contactDetails: {
    phoneNumbers: [ String ]
  },

  residentialDetails: {
    country: { type: String, set: ignoreEmpty },
    province: { type: String, set: ignoreEmpty },
    address: { type: String, set: ignoreEmpty }
  },

  activeApps: [ String ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "User", userSchema );

export { MongooseModel };

/******************************************************************************/
