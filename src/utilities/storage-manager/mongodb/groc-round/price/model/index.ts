/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../interfaces";
import * as mongoDB from "../../../../../utilities/storage-manager/mongodb";

import { ignoreEmpty } from "../../preparation";

/******************************************************************************/

export interface Model extends mongoose.Document, mongoDB.Document {
  emailAddress: string;
  accessLevel: interfaces.datModel.core.AccessLevel;
  password: string;
  resetCode?: string;

  verification: Verification;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;

  activeApps: interfaces.AppName[];
}
export interface Model_Partial extends Partial<Pick<Model, ModelPartial_Details_Flat>> {
  verification?: Verification_Partial;
  personalDetails?: PersonalDetails_Partial;
  contactDetails?: ContactDetails_Partial;
};
type ModelPartial_Details_Flat = "emailAddress" | "accessLevel" | "password"
  | "resetCode" | "activeApps";

/******************************************************************************/

export interface Verification extends mongoose.Types.Subdocument, mongoDB.Document {
  verified: boolean;
  verificationCode?: string;
  numVerAttempts: number;
}
type Verification_Partial = Partial<Verification>;

export interface PersonalDetails extends mongoose.Document, mongoDB.Document {
  firstName: string;
  lastName: string;
}
type PersonalDetails_Partial = Partial<PersonalDetails>;

export interface ContactDetails extends mongoose.Document, mongoDB.Document {
  phoneNumbers: string[];
}
type ContactDetails_Partial = Partial<ContactDetails>;

/******************************************************************************/

let userSchema = new mongoose.Schema( {

  emailAddress: { type: String, set: ignoreEmpty },
  accessLevel: { type: String, set: ignoreEmpty },
  password: { type: String, set: ignoreEmpty },
  resetCode: { type: String, set: ignoreEmpty },

  verification: {
    verified: { type: Boolean, default: false, set: ignoreEmpty },
    verificationCode: { type: String, set: ignoreEmpty },
    numVerAttempts: { type: Number, min: 0, default: 0, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  personalDetails: {
    firstName: { type: String, set: ignoreEmpty },
    lastName: { type: String, set: ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  contactDetails: {
    phoneNumbers: [ String ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },

  activeApps: [ String ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let UserMongooseModel = mongoose.model<Model>( "User", userSchema );

export { UserMongooseModel };

/******************************************************************************/
