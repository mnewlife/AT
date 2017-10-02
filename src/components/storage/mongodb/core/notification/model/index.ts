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
  type: string;
  app: root.AppName;
  label: string;
  seen: boolean;
  cleared: boolean;
}

/******************************************************************************/

let notificationSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  type: x.StringSchema,
  app: x.StringSchema,
  label: x.StringSchema,
  seen: x.BooleanSchema,
  cleared: x.BooleanSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Notification", notificationSchema );

export { MongooseModel };

/******************************************************************************/
