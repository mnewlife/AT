/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../../core/user/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  user: user.UserInfo;
  title: string;
  images: string[];
  tags: string[];
  content: string;
}

/******************************************************************************/

let articleSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  title: x.StringSchema,
  images: [ x.StringSchema ],
  tags: [ x.StringSchema ],
  content: x.StringSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Article", articleSchema );

export { MongooseModel };

/******************************************************************************/
