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
  cartId: mongoose.Types.ObjectId;
  product: {
    productId: mongoose.Types.ObjectId;
    label: string;
    quantity: number;
    value: number;
  };
}

/******************************************************************************/

let cartProductSchema = new mongoose.Schema( {

  user: user.UserInfoSchema,
  round: round.RoundInfoSchema,
  cartId: x.ObjectIdSchema,
  product: {
    productId: mongoose.Schema.Types.ObjectId,
    label: x.StringSchema,
    quantity: x.NumberSchema,
    value: x.NumberSchema
  },

  createdAt: x.DateSchema,
  updatedAt: x.DateSchema

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "CartProduct", cartProductSchema );

export { MongooseModel };

/******************************************************************************/
