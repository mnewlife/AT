/******************************************************************************/

import * as mongoose from "mongoose";

import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../../core/user/model";
import * as round from "../../round/model";

/******************************************************************************/

export interface Model extends mongoose.Document, ModelNuance { }
export interface ModelNuance extends mongoDB.Document {
  user: user.UserInfo;
  round: round.RoundInfo;
  adminFeePercentage: number;
  numProducts: number;
  valueProducts: number;
}

/******************************************************************************/

let cartSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  round: round.RoundInfoSchema,
  adminFeePercentage: x.NumberSchema,
  numProducts: x.NumberSchema,
  valueProducts: x.NumberSchema,

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "Cart", cartSchema );

export { MongooseModel };

/******************************************************************************/
