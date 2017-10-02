/******************************************************************************/

import * as mongoose from "mongoose";

import * as root from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../user/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  user: user.UserInfo;
  app: root.AppName;
  invitees: Invitee[];
};

export interface Invitee {
  emailAddress: string;
  userId?: mongoose.Types.ObjectId;
  fullName?: string;
  converted: boolean;
};

/******************************************************************************/

let invitationSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  app: x.StringSchema,
  invitees: [ {
    emailAddress: x.StringSchema,
    userId: x.StringSchema,
    fullName: x.StringSchema,
    converted: x.BooleanSchema
  }],
  
  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Invitation", invitationSchema );

export { MongooseModel };

/******************************************************************************/
