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
  payment: {
    identifier: string;
    amount: number;
    method: string;
  };
}

/******************************************************************************/

let deliveryFeeSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  round: round.RoundInfoSchema,
  payment: {
    identifier: x.StringSchema,
    amount: x.NumberSchema,
    method: x.StringSchema
  },

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "DeliveryFee", deliveryFeeSchema );

export { MongooseModel };

/******************************************************************************/
