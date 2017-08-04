/******************************************************************************/

import * as interfaces from "../../../../../interfaces/index";
import * as mongoose from "mongoose";

import { ignoreEmpty } from "../../preparation/index";

/******************************************************************************/

export type UserModel = interfaces.dataModel.implementations.UserModel;

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
    dateOfBirth: { type: Date, set: ignoreEmpty },
    age: { type: Number, min: 0, set: ignoreEmpty },
    gender: { type: String, set: ignoreEmpty }
  },

  contactDetails: {
    phoneNumbers: [ { type: String, set: ignoreEmpty }]
  },

  residentialDetails: {
    country: { type: String, set: ignoreEmpty },
    province: { type: String, set: ignoreEmpty },
    address: { type: String, set: ignoreEmpty },
  },

  activeApps: [ { type: String, set: ignoreEmpty }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let UserMongooseModel = mongoose.model<UserModel>( "User", userSchema );

export { UserMongooseModel };

/******************************************************************************/
