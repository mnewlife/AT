/******************************************************************************/

import * as mongoose from "mongoose";
import * as src from "../../../../../../interfaces";

import * as dataModel from "../../../../../../data-model";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";

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

/******************************************************************************/

export interface UserInfo {
  userId: mongoose.Types.ObjectId;
  emailAddress: string;
  fullName?: string;
}

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

export let UserInfoSchema = {
  userId: x.ObjectIdSchema,
  emailAddress: x.StringSchema,
  fullName: x.StringSchema
};

let userSchema = new mongoose.Schema( {

  emailAddress: x.StringSchema,
  accessLevel: x.StringSchema,
  password: x.StringSchema,
  resetCode: x.StringSchema,

  verification: {
    verified: x.BooleanSchema,
    verificationCode: x.StringSchema,
    numVerAttempts: x.NumberSchema
  },

  personalDetails: {
    firstName: x.StringSchema,
    lastName: x.StringSchema,
    dateOfBirth: { type: Date },
    gender: x.StringSchema
  },

  contactDetails: {
    phoneNumbers: [ x.StringSchema ]
  },

  residentialDetails: {
    country: x.StringSchema,
    province: x.StringSchema,
    address: x.StringSchema
  },

  activeApps: [ x.StringSchema ],

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "User", userSchema );

export { MongooseModel };

/******************************************************************************/
